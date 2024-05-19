"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDecompressV1Instruction = exports.decompressV1InstructionDiscriminator = exports.decompressV1Struct = void 0;
const splToken = __importStar(require("@solana/spl-token"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const MetadataArgs_1 = require("../types/MetadataArgs");
exports.decompressV1Struct = new beet.FixableBeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['metadata', MetadataArgs_1.metadataArgsBeet],
], 'DecompressV1InstructionArgs');
exports.decompressV1InstructionDiscriminator = [54, 85, 76, 70, 228, 250, 164, 81];
function createDecompressV1Instruction(accounts, args, programId = new web3.PublicKey('BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY')) {
    var _a, _b;
    const [data] = exports.decompressV1Struct.serialize({
        instructionDiscriminator: exports.decompressV1InstructionDiscriminator,
        ...args,
    });
    const keys = [
        {
            pubkey: accounts.voucher,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.leafOwner,
            isWritable: true,
            isSigner: true,
        },
        {
            pubkey: accounts.tokenAccount,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.mint,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.mintAuthority,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.metadata,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.masterEdition,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: (_a = accounts.systemProgram) !== null && _a !== void 0 ? _a : web3.SystemProgram.programId,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.sysvarRent,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.tokenMetadataProgram,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: (_b = accounts.tokenProgram) !== null && _b !== void 0 ? _b : splToken.TOKEN_PROGRAM_ID,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.associatedTokenProgram,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.logWrapper,
            isWritable: false,
            isSigner: false,
        },
    ];
    if (accounts.anchorRemainingAccounts != null) {
        for (const acc of accounts.anchorRemainingAccounts) {
            keys.push(acc);
        }
    }
    const ix = new web3.TransactionInstruction({
        programId,
        keys,
        data,
    });
    return ix;
}
exports.createDecompressV1Instruction = createDecompressV1Instruction;
//# sourceMappingURL=decompressV1.js.map