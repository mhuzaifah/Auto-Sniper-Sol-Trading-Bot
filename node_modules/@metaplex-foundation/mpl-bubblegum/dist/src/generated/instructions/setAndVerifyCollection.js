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
exports.createSetAndVerifyCollectionInstruction = exports.setAndVerifyCollectionInstructionDiscriminator = exports.setAndVerifyCollectionStruct = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const MetadataArgs_1 = require("../types/MetadataArgs");
exports.setAndVerifyCollectionStruct = new beet.FixableBeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['root', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['dataHash', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['creatorHash', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['nonce', beet.u64],
    ['index', beet.u32],
    ['message', MetadataArgs_1.metadataArgsBeet],
    ['collection', beetSolana.publicKey],
], 'SetAndVerifyCollectionInstructionArgs');
exports.setAndVerifyCollectionInstructionDiscriminator = [
    235, 242, 121, 216, 158, 234, 180, 234,
];
function createSetAndVerifyCollectionInstruction(accounts, args, programId = new web3.PublicKey('BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY')) {
    var _a;
    const [data] = exports.setAndVerifyCollectionStruct.serialize({
        instructionDiscriminator: exports.setAndVerifyCollectionInstructionDiscriminator,
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
            pubkey: accounts.treeDelegate,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.collectionAuthority,
            isWritable: false,
            isSigner: true,
        },
        {
            pubkey: accounts.collectionAuthorityRecordPda,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.collectionMint,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.collectionMetadata,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.editionAccount,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.bubblegumSigner,
            isWritable: false,
            isSigner: false,
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
            pubkey: accounts.tokenMetadataProgram,
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
exports.createSetAndVerifyCollectionInstruction = createSetAndVerifyCollectionInstruction;
//# sourceMappingURL=setAndVerifyCollection.js.map