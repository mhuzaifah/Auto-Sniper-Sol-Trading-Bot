import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { MetadataArgs } from '../types/MetadataArgs';
export type VerifyCollectionInstructionArgs = {
    root: number[];
    dataHash: number[];
    creatorHash: number[];
    nonce: beet.bignum;
    index: number;
    message: MetadataArgs;
};
export declare const verifyCollectionStruct: beet.FixableBeetArgsStruct<VerifyCollectionInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type VerifyCollectionInstructionAccounts = {
    treeAuthority: web3.PublicKey;
    leafOwner: web3.PublicKey;
    leafDelegate: web3.PublicKey;
    merkleTree: web3.PublicKey;
    payer: web3.PublicKey;
    treeDelegate: web3.PublicKey;
    collectionAuthority: web3.PublicKey;
    collectionAuthorityRecordPda: web3.PublicKey;
    collectionMint: web3.PublicKey;
    collectionMetadata: web3.PublicKey;
    editionAccount: web3.PublicKey;
    bubblegumSigner: web3.PublicKey;
    logWrapper: web3.PublicKey;
    compressionProgram: web3.PublicKey;
    tokenMetadataProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const verifyCollectionInstructionDiscriminator: number[];
export declare function createVerifyCollectionInstruction(accounts: VerifyCollectionInstructionAccounts, args: VerifyCollectionInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
