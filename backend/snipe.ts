import { Liquidity, LiquidityPoolKeysV4, Percent, TOKEN_PROGRAM_ID, Token, TokenAmount } from "@raydium-io/raydium-sdk";
import { Commitment, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, getAssociatedTokenAddress, createAssociatedTokenAccountIdempotentInstruction, getOrCreateAssociatedTokenAccount, createSyncNativeInstruction, createCloseAccountInstruction } from "@solana/spl-token";
import { Bundle } from "jito-ts/dist/sdk/block-engine/types.js";
import { searcherClient } from "jito-ts/dist/sdk/block-engine/searcher.js";
import bs58 from "bs58";
import { JITO_KEY, PRIV_KEY, SLIPPAGE, SNIPE_AMOUNT, JITO_BLOCK_URL, JITO_FEE } from "./config";
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

let latestBlockhash: Readonly<{ blockhash: string; lastValidBlockHeight: number }>;

export async function snipe(poolKeys: LiquidityPoolKeysV4, baseSol: boolean) {
    const wallet = Keypair.fromSecretKey(bs58.decode(PRIV_KEY));
    const ataIn = (await getOrCreateAssociatedTokenAccount(connection, wallet, Token.WSOL.mint, wallet.publicKey)).address;
    const ataOut = await getAssociatedTokenAddress(baseSol ? poolKeys.quoteMint : poolKeys.baseMint, wallet.publicKey);
    const tokenIn = Token.WSOL;
    const tokenOut = new Token(TOKEN_PROGRAM_ID, baseSol ? poolKeys.quoteMint : poolKeys.baseMint, baseSol ? poolKeys.quoteDecimals : poolKeys.baseDecimals);
    const quoteAmount = new TokenAmount(tokenIn, SNIPE_AMOUNT, false);

    // Execute the buy transaction
    const buyTx = await buildSwapTransaction(poolKeys, quoteAmount, ataIn, ataOut, wallet, tokenOut, tokenIn, "buy");
    console.log("Buy transaction built successfully. Creating Jito bundle...");
    const jitoBuyTx = await createJitoBundle(wallet);
    const buyConfirmation = await sendAndConfirmBundle(buyTx, jitoBuyTx);
    console.log("Buy confirmed. Proceeding to sell...");

    // Execute the sell transaction
    const sellTx = await buildSwapTransaction(poolKeys, quoteAmount, ataOut, ataIn, wallet, tokenIn, tokenOut, "sell");
    console.log("Sell transaction built successfully. Creating Jito bundle...");
    const jitoSellTx = await createJitoBundle(wallet);
    const sellConfirmation = await sendAndConfirmBundle(sellTx, jitoSellTx);
    console.log("Sell confirmed.");

    return { buyConfirmation, sellConfirmation };
}

async function buildSwapTransaction(poolKeys: LiquidityPoolKeysV4, buyQuoteAmount: TokenAmount, ataIn: PublicKey, ataOut: PublicKey, wallet: Keypair, tokenOut: Token, tokenIn: Token, direction: "buy" | "sell") {
    const poolInfo = await Liquidity.fetchInfo({ connection, poolKeys });
    let quoteAmount;

    if (direction === "buy") {
        quoteAmount = buyQuoteAmount;
    } else {
        quoteAmount = new TokenAmount(tokenIn, Number((await connection.getTokenAccountBalance(ataIn)).value.uiAmountString), false);
    }

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

    latestBlockhash = await connection.getLatestBlockhash();
    let instructions: TransactionInstruction[] = [];

    if (direction === "buy") {
        instructions.push(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: ataIn,
                lamports: quoteAmount.raw,
            })
        );
        instructions.push(createSyncNativeInstruction(ataIn, TOKEN_PROGRAM_ID));
        instructions.push(createAssociatedTokenAccountIdempotentInstruction(wallet.publicKey, ataOut, wallet.publicKey, tokenOut.mint));
    }

    instructions.push(...innerTransaction.instructions);

    if (direction === "sell") {
        instructions.push(createCloseAccountInstruction(ataIn, wallet.publicKey, wallet.publicKey));
    }

    const versionedTx = new VersionedTransaction(
        new TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: instructions,
        }).compileToV0Message()
    );

    versionedTx.sign([wallet]);

    return versionedTx;
}

async function createJitoBundle(wallet: Keypair) {
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
    let confirmation;

    confirmation = await connection.confirmTransaction({
        signature,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        blockhash: latestBlockhash.blockhash,
    });

    return confirmation;
}