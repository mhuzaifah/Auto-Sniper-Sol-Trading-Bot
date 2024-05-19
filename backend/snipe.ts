import { Liquidity, LiquidityPoolKeysV4, Percent, TOKEN_PROGRAM_ID, Token, TokenAmount } from "@raydium-io/raydium-sdk";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, getAssociatedTokenAddress, createAssociatedTokenAccountIdempotentInstruction, getOrCreateAssociatedTokenAccount, createSyncNativeInstruction } from "@solana/spl-token";
import { Bundle } from "jito-ts/dist/sdk/block-engine/types.js";
import { searcherClient } from "jito-ts/dist/sdk/block-engine/searcher.js";
import bs58 from "bs58";
import { JITO_KEY, PRIV_KEY, SLIPPAGE, SNIPE_AMOUNT, JITO_BLOCK_URL, JITO_FEE, SELL_AMOUNT } from "./config";
import { connection } from "./main";

const jitoTipAccounts = [
    "96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5",
    "HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe",
    "Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY",
    "ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49",
    "DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh",
    "ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt",
    "DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL",
    "3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT",
];

export async function snipe(poolKeys: LiquidityPoolKeysV4, baseSol: boolean) {
    const wallet = Keypair.fromSecretKey(bs58.decode(PRIV_KEY));
    const ataIn = (await getOrCreateAssociatedTokenAccount(connection, wallet, Token.WSOL.mint, wallet.publicKey)).address;
    const ataOut = await getAssociatedTokenAddress(baseSol ? poolKeys.quoteMint : poolKeys.baseMint, wallet.publicKey);
    const tokenIn = Token.WSOL;
    const tokenOut = new Token(TOKEN_PROGRAM_ID, baseSol ? poolKeys.quoteMint : poolKeys.baseMint, baseSol ? poolKeys.quoteDecimals : poolKeys.baseDecimals);
    const quoteAmount = new TokenAmount(tokenIn, SNIPE_AMOUNT, false);

    const swapTx = await buildSwapTransaction(poolKeys, quoteAmount, ataIn, ataOut, wallet, tokenOut);
    console.log("Swap transaction built successfully. Creating Jito bundle...");

    const jitoTx = await createJitoBundle(wallet);
    const confirmation = await sendAndConfirmBundle(swapTx, jitoTx);

    return confirmation;
}

async function buildSwapTransaction(poolKeys: LiquidityPoolKeysV4, quoteAmount: TokenAmount, ataIn: PublicKey, ataOut: PublicKey, wallet: Keypair, tokenOut: Token) {
    const poolInfo = await Liquidity.fetchInfo({ connection, poolKeys });

    const computedAmountOut = Liquidity.computeAmountOut({
        poolKeys,
        poolInfo,
        amountIn: quoteAmount,
        currencyOut: tokenOut,
        slippage: new Percent(SLIPPAGE, 100),
    });

    const { innerTransaction } = Liquidity.makeSwapFixedInInstruction(
        {
            poolKeys,
            userKeys: {
                tokenAccountIn: ataIn,
                tokenAccountOut: ataOut,
                owner: wallet.publicKey,
            },
            amountIn: quoteAmount.raw,
            minAmountOut: computedAmountOut.minAmountOut.raw,
        },
        poolKeys.version
    );

    const latestBlockhash = await connection.getLatestBlockhash();

    let wsolBalance =  await connection.getTokenAccountBalance(ataIn);
    let availableWsol = Number(wsolBalance.value.uiAmountString as string) * wsolBalance.value.decimals;

    console.log(quoteAmount.raw + availableWsol);

    const versionedTx = new VersionedTransaction(
        new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: ataIn,
                    lamports: quoteAmount.raw,
                }),
                createSyncNativeInstruction(ataIn, TOKEN_PROGRAM_ID),
                createAssociatedTokenAccountIdempotentInstruction(wallet.publicKey, ataOut, wallet.publicKey, tokenOut.mint),
                ...innerTransaction.instructions,
            ],
        }).compileToV0Message()
    );

    versionedTx.sign([wallet]);

    return versionedTx;
}

export async function sell(poolKeys: LiquidityPoolKeysV4, baseSol: boolean) {
    const wallet = Keypair.fromSecretKey(bs58.decode(PRIV_KEY));
    const ataOut = (await getOrCreateAssociatedTokenAccount(connection, wallet, Token.WSOL.mint, wallet.publicKey)).address;
    const ataIn = await getAssociatedTokenAddress(baseSol ? poolKeys.quoteMint : poolKeys.baseMint, wallet.publicKey);
    const tokenOut = Token.WSOL;
    const tokenIn = new Token(TOKEN_PROGRAM_ID, baseSol ? poolKeys.quoteMint : poolKeys.baseMint, baseSol ? poolKeys.quoteDecimals : poolKeys.baseDecimals);

    // Get token balance
    const tokenBalanceInfo = await connection.getTokenAccountBalance(ataIn);
    const tokenBalance = Number(tokenBalanceInfo.value.amount);

    // Calculate sell amount based on the percentage
    const sellAmountInSmallestUnit = tokenBalance * SELL_AMOUNT;
    const sellAmount = new TokenAmount(tokenIn, sellAmountInSmallestUnit, false);

    const swapTx = await buildSellTransaction(poolKeys, sellAmount, ataIn, ataOut, wallet, tokenOut);
    console.log("Sell transaction built successfully. Creating Jito bundle...");

    const jitoTx = await createJitoBundle(wallet);
    const confirmation = await sendAndConfirmBundle(swapTx, jitoTx);

    return confirmation;
}

async function buildSellTransaction(poolKeys: LiquidityPoolKeysV4, sellAmount: TokenAmount, ataIn: PublicKey, ataOut: PublicKey, wallet: Keypair, tokenOut: Token) {
    const poolInfo = await Liquidity.fetchInfo({ connection, poolKeys });

    const computedAmountOut = Liquidity.computeAmountOut({
        poolKeys,
        poolInfo,
        amountIn: sellAmount,
        currencyOut: tokenOut,
        slippage: new Percent(SLIPPAGE, 100),
    });

    const { innerTransaction } = Liquidity.makeSwapFixedInInstruction(
        {
            poolKeys,
            userKeys: {
                tokenAccountIn: ataIn,
                tokenAccountOut: ataOut,
                owner: wallet.publicKey,
            },
            amountIn: sellAmount.raw,
            minAmountOut: computedAmountOut.minAmountOut.raw,
        },
        poolKeys.version
    );

    const latestBlockhash = await connection.getLatestBlockhash();

    const versionedTx = new VersionedTransaction(
        new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [
                createAssociatedTokenAccountIdempotentInstruction(wallet.publicKey, ataOut, wallet.publicKey, tokenOut.mint),
                ...innerTransaction.instructions,
            ],
        }).compileToV0Message()
    );

    versionedTx.sign([wallet]);

    return versionedTx;
}

async function createJitoBundle(wallet: Keypair) {
    const latestBlockhash = await connection.getLatestBlockhash();
    let i = Math.floor(Math.random() * jitoTipAccounts.length);
    const tipAccount = new PublicKey(jitoTipAccounts[i]);

    const jitoTx = new VersionedTransaction(
        new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: tipAccount,
                    lamports: BigInt(JITO_FEE * LAMPORTS_PER_SOL),
                }),
            ],
        }).compileToV0Message()
    );

    jitoTx.sign([wallet]);

    return jitoTx;
}

async function sendAndConfirmBundle(versionedTx: VersionedTransaction, jitoTx: VersionedTransaction) {
    const txSigned: VersionedTransaction[] = [versionedTx, jitoTx];

    const jitoKey = Keypair.fromSecretKey(bs58.decode(JITO_KEY));
    const searcher = searcherClient(JITO_BLOCK_URL, jitoKey, { "grpc.keepalive_time_ms": 4000 });

    const bundleId = await searcher.sendBundle(new Bundle(txSigned, txSigned.length));

    const signature = bs58.encode(versionedTx.signatures[0]);
    const latestBlockhash = await connection.getLatestBlockhash();
    let confirmation;

    confirmation = await connection.confirmTransaction({
        signature,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        blockhash: latestBlockhash.blockhash,
    });

    return confirmation;
}