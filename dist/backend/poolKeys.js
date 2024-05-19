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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolKeys = void 0;
const web3_js_1 = require("@solana/web3.js");
const main_1 = require("./main");
const raydium_sdk_1 = require("@raydium-io/raydium-sdk");
function getPoolKeys(txSignature) {
    return __awaiter(this, void 0, void 0, function* () {
        const tx = yield main_1.connection.getParsedTransaction(txSignature, { maxSupportedTransactionVersion: 0 });
        if (!tx) {
            return null;
        }
        const poolInfo = parsePoolInfo(tx);
        if (!poolInfo) {
            return null;
        }
        const marketData = yield getMarketInfo(poolInfo.marketId);
        if (!marketData) {
            return null;
        }
        const marketInfo = raydium_sdk_1.MARKET_STATE_LAYOUT_V3.decode(marketData.data);
        return Object.assign(Object.assign({}, poolInfo), { marketAuthority: raydium_sdk_1.Market.getAssociatedAuthority({ programId: poolInfo.marketProgramId, marketId: poolInfo.marketId }).publicKey, marketBaseVault: marketInfo.baseVault, marketQuoteVault: marketInfo.quoteVault, marketBids: marketInfo.bids, marketAsks: marketInfo.asks, marketEventQueue: marketInfo.eventQueue });
    });
}
exports.getPoolKeys = getPoolKeys;
function parsePoolInfo(txData) {
    var _a, _b;
    const { transaction, meta } = txData;
    const initInstruction = findInstructionByProgram(transaction.message.instructions, raydium_sdk_1.MAINNET_PROGRAM_ID.AmmV4);
    if (!initInstruction) {
        return null;
    }
    const [lpMint, baseMint, quoteMint, baseVault, quoteVault] = initInstruction.accounts.slice(7, 12);
    const innerInstructions = (_a = meta === null || meta === void 0 ? void 0 : meta.innerInstructions) !== null && _a !== void 0 ? _a : [];
    const lpInitInstruction = findIxTypeByAddress(innerInstructions, lpMint, "initializeMint");
    const lpMintInstruction = findIxTypeByAddress(innerInstructions, lpMint, "mintTo");
    if (!lpInitInstruction || !lpMintInstruction) {
        return null;
    }
    const baseTransferIx = findTransferIxByDestination(innerInstructions, baseVault, raydium_sdk_1.TOKEN_PROGRAM_ID);
    const quoteTransferIx = findTransferIxByDestination(innerInstructions, quoteVault, raydium_sdk_1.TOKEN_PROGRAM_ID);
    if (!baseTransferIx || !quoteTransferIx) {
        return null;
    }
    const lpDecimals = lpInitInstruction.parsed.info.decimals;
    const basePreBalance = (_b = meta === null || meta === void 0 ? void 0 : meta.preTokenBalances) === null || _b === void 0 ? void 0 : _b.find((balance) => balance.mint === baseMint.toBase58());
    if (!basePreBalance) {
        return null;
    }
    const baseDecimals = basePreBalance === null || basePreBalance === void 0 ? void 0 : basePreBalance.uiTokenAmount.decimals;
    const swapBase = baseMint.equals(raydium_sdk_1.Token.WSOL.mint);
    return {
        id: initInstruction.accounts[4],
        baseMint,
        quoteMint,
        lpMint,
        baseDecimals: swapBase ? 9 : baseDecimals,
        quoteDecimals: swapBase ? baseDecimals : 9,
        lpDecimals,
        version: 4,
        programId: raydium_sdk_1.MAINNET_PROGRAM_ID.AmmV4,
        authority: initInstruction.accounts[5],
        openOrders: initInstruction.accounts[6],
        targetOrders: initInstruction.accounts[13],
        baseVault,
        quoteVault,
        withdrawQueue: new web3_js_1.PublicKey("11111111111111111111111111111111"),
        lpVault: new web3_js_1.PublicKey(lpMintInstruction.parsed.info.account),
        marketVersion: 3,
        marketProgramId: initInstruction.accounts[15],
        marketId: initInstruction.accounts[16],
    };
}
function findInstructionByProgram(instructions, programId) {
    const instruction = instructions.find((instruction) => instruction.programId.equals(programId));
    if (!instruction) {
        return null;
    }
    return instruction;
}
function findIxTypeByAddress(innerInstructions, mintAddress, ixType) {
    for (const innerInstruction of innerInstructions) {
        for (const instruction of innerInstruction.instructions) {
            if (!instruction.parsed)
                continue;
            if (instruction.parsed.type === ixType && instruction.parsed.info.mint === mintAddress.toBase58()) {
                return instruction;
            }
        }
    }
    return null;
}
function findTransferIxByDestination(innerInstructions, destinationAddress, programId) {
    for (const innerInstruction of innerInstructions) {
        for (const instruction of innerInstruction.instructions) {
            if (!instruction.parsed)
                continue;
            if (instruction.parsed.type === "transfer" && instruction.parsed.info.destination === destinationAddress.toBase58() && instruction.programId.equals(programId)) {
                return instruction;
            }
        }
    }
    return null;
}
function getMarketInfo(marketId) {
    return __awaiter(this, void 0, void 0, function* () {
        const marketInfo = yield main_1.connection.getAccountInfo(marketId);
        if (!marketInfo) {
            return null;
        }
        return marketInfo;
    });
}
