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
exports.createVerifyCreatorInstruction = exports.verifyCreatorInstructionDiscriminator = exports.verifyCreatorStruct = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const MetadataArgs_1 = require("../types/MetadataArgs");
exports.verifyCreatorStruct = new beet.FixableBeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['root', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['dataHash', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['creatorHash', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['nonce', beet.u64],
    ['index', beet.u32],
    ['message', MetadataArgs_1.metadataArgsBeet],
], 'VerifyCreatorInstructionArgs');
exports.verifyCreatorInstructionDiscriminator = [52, 17, 96, 132, 71, 4, 85, 194];
function createVerifyCreatorInstruction(accounts, args, programId = new web3.PublicKey('BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY')) {
    var _a;
    const [data] = exports.verifyCreatorStruct.serialize({
        instructionDiscriminator: exports.verifyCreatorInstructionDiscriminator,
        ...args,
    });
    const keys = [
        {
            pubkey: accounts.treeAuthority,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.leafOwner,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.leafDelegate,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.merkleTree,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.payer,
            isWritable: false,
            isSigner: true,
        },
        {
            pubkey: accounts.creator,
            isWritable: false,
            isSigner: true,
        },
        {
            pubkey: accounts.logWrapper,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.compressionProgram,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: (_a = accounts.systemProgram) !== null && _a !== void 0 ? _a : web3.SystemProgram.programId,
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
exports.createVerifyCreatorInstruction = createVerifyCreatorInstruction;
//# sourceMappingURL=verifyCreator.js.map