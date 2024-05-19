"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sell = exports.snipe = void 0;
const raydium_sdk_1 = require("@raydium-io/raydium-sdk");
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const types_js_1 = require("jito-ts/dist/sdk/block-engine/types.js");
const searcher_js_1 = require("jito-ts/dist/sdk/block-engine/searcher.js");
const bs58_1 = __importDefault(require("bs58"));
const config_1 = require("./config");
const main_1 = require("./main");
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
function snipe(poolKeys, baseSol) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(config_1.PRIV_KEY));
        const ataIn = (yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(main_1.connection, wallet, raydium_sdk_1.Token.WSOL.mint, wallet.publicKey)).address;
        const ataOut = yield (0, spl_token_1.getAssociatedTokenAddress)(baseSol ? poolKeys.quoteMint : poolKeys.baseMint, wallet.publicKey);
        const tokenIn = raydium_sdk_1.Token.WSOL;
        const tokenOut = new raydium_sdk_1.Token(raydium_sdk_1.TOKEN_PROGRAM_ID, baseSol ? poolKeys.quoteMint : poolKeys.baseMint, baseSol ? poolKeys.quoteDecimals : poolKeys.baseDecimals);
        const quoteAmount = new raydium_sdk_1.TokenAmount(tokenIn, config_1.SNIPE_AMOUNT, false);
        const swapTx = yield buildSwapTransaction(poolKeys, quoteAmount, ataIn, ataOut, wallet, tokenOut);
        console.log("Swap transaction built successfully. Creating Jito bundle...");
        const jitoTx = yield createJitoBundle(wallet);
        const confirmation = yield sendAndConfirmBundle(swapTx, jitoTx);
        return confirmation;
    });
}
exports.snipe = snipe;
function buildSwapTransaction(poolKeys, quoteAmount, ataIn, ataOut, wallet, tokenOut) {
    return __awaiter(this, void 0, void 0, function* () {
        const poolInfo = yield raydium_sdk_1.Liquidity.fetchInfo({ connection: main_1.connection, poolKeys });
        const computedAmountOut = raydium_sdk_1.Liquidity.computeAmountOut({
            poolKeys,
            poolInfo,
            amountIn: quoteAmount,
            currencyOut: tokenOut,
            slippage: new raydium_sdk_1.Percent(config_1.SLIPPAGE, 100),
        });
        const { innerTransaction } = raydium_sdk_1.Liquidity.makeSwapFixedInInstruction({
            poolKeys,
            userKeys: {
                tokenAccountIn: ataIn,
                tokenAccountOut: ataOut,
                owner: wallet.publicKey,
            },
            amountIn: quoteAmount.raw,
            minAmountOut: computedAmountOut.minAmountOut.raw,
        }, poolKeys.version);
        const latestBlockhash = yield main_1.connection.getLatestBlockhash();
        let wsolBalance = yield main_1.connection.getTokenAccountBalance(ataIn);
        let availableWsol = Number(wsolBalance.value.uiAmountString) * wsolBalance.value.decimals;
        console.log(quoteAmount.raw + availableWsol);
        const versionedTx = new web3_js_1.VersionedTransaction(new web3_js_1.TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [
                web3_js_1.SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: ataIn,
                    lamports: quoteAmount.raw,
                }),
                (0, spl_token_1.createSyncNativeInstruction)(ataIn, raydium_sdk_1.TOKEN_PROGRAM_ID),
                (0, spl_token_1.createAssociatedTokenAccountIdempotentInstruction)(wallet.publicKey, ataOut, wallet.publicKey, tokenOut.mint),
                ...innerTransaction.instructions,
            ],
        }).compileToV0Message());
        versionedTx.sign([wallet]);
        return versionedTx;
    });
}
function sell(poolKeys, baseSol) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(config_1.PRIV_KEY));
        const ataOut = (yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(main_1.connection, wallet, raydium_sdk_1.Token.WSOL.mint, wallet.publicKey)).address;
        const ataIn = yield (0, spl_token_1.getAssociatedTokenAddress)(baseSol ? poolKeys.quoteMint : poolKeys.baseMint, wallet.publicKey);
        const tokenOut = raydium_sdk_1.Token.WSOL;
        const tokenIn = new raydium_sdk_1.Token(raydium_sdk_1.TOKEN_PROGRAM_ID, baseSol ? poolKeys.quoteMint : poolKeys.baseMint, baseSol ? poolKeys.quoteDecimals : poolKeys.baseDecimals);
        // Get token balance
        const tokenBalanceInfo = yield main_1.connection.getTokenAccountBalance(ataIn);
        const tokenBalance = Number(tokenBalanceInfo.value.amount);
        // Calculate sell amount based on the percentage
        const sellAmountInSmallestUnit = tokenBalance * config_1.SELL_AMOUNT;
        const sellAmount = new raydium_sdk_1.TokenAmount(tokenIn, sellAmountInSmallestUnit, false);
        const swapTx = yield buildSellTransaction(poolKeys, sellAmount, ataIn, ataOut, wallet, tokenOut);
        console.log("Sell transaction built successfully. Creating Jito bundle...");
        const jitoTx = yield createJitoBundle(wallet);
        const confirmation = yield sendAndConfirmBundle(swapTx, jitoTx);
        return confirmation;
    });
}
exports.sell = sell;
function buildSellTransaction(poolKeys, sellAmount, ataIn, ataOut, wallet, tokenOut) {
    return __awaiter(this, void 0, void 0, function* () {
        const poolInfo = yield raydium_sdk_1.Liquidity.fetchInfo({ connection: main_1.connection, poolKeys });
        const computedAmountOut = raydium_sdk_1.Liquidity.computeAmountOut({
            poolKeys,
            poolInfo,
            amountIn: sellAmount,
            currencyOut: tokenOut,
            slippage: new raydium_sdk_1.Percent(config_1.SLIPPAGE, 100),
        });
        const { innerTransaction } = raydium_sdk_1.Liquidity.makeSwapFixedInInstruction({
            poolKeys,
            userKeys: {
                tokenAccountIn: ataIn,
                tokenAccountOut: ataOut,
                owner: wallet.publicKey,
            },
            amountIn: sellAmount.raw,
            minAmountOut: computedAmountOut.minAmountOut.raw,
        }, poolKeys.version);
        const latestBlockhash = yield main_1.connection.getLatestBlockhash();
        const versionedTx = new web3_js_1.VersionedTransaction(new web3_js_1.TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [
                (0, spl_token_1.createAssociatedTokenAccountIdempotentInstruction)(wallet.publicKey, ataOut, wallet.publicKey, tokenOut.mint),
                ...innerTransaction.instructions,
            ],
        }).compileToV0Message());
        versionedTx.sign([wallet]);
        return versionedTx;
    });
}
function createJitoBundle(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const latestBlockhash = yield main_1.connection.getLatestBlockhash();
        let i = Math.floor(Math.random() * jitoTipAccounts.length);
        const tipAccount = new web3_js_1.PublicKey(jitoTipAccounts[i]);
        const jitoTx = new web3_js_1.VersionedTransaction(new web3_js_1.TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [
                web3_js_1.SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: tipAccount,
                    lamports: BigInt(config_1.JITO_FEE * web3_js_1.LAMPORTS_PER_SOL),
                }),
            ],
        }).compileToV0Message());
        jitoTx.sign([wallet]);
        return jitoTx;
    });
}
function sendAndConfirmBundle(versionedTx, jitoTx) {
    return __awaiter(this, void 0, void 0, function* () {
        const txSigned = [versionedTx, jitoTx];
        const jitoKey = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(config_1.JITO_KEY));
        const searcher = (0, searcher_js_1.searcherClient)(config_1.JITO_BLOCK_URL, jitoKey, { "grpc.keepalive_time_ms": 4000 });
        const bundleId = yield searcher.sendBundle(new types_js_1.Bundle(txSigned, txSigned.length));
        const signature = bs58_1.default.encode(versionedTx.signatures[0]);
        const latestBlockhash = yield main_1.connection.getLatestBlockhash();
        let confirmation;
        confirmation = yield main_1.connection.confirmTransaction({
            signature,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            blockhash: latestBlockhash.blockhash,
        });
        return confirmation;
    });
}
