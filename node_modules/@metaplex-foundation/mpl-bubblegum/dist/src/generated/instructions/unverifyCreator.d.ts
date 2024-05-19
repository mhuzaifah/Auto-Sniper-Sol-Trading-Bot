import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { MetadataArgs } from '../types/MetadataArgs';
export type UnverifyCreatorInstructionArgs = {
    root: number[];
    dataHash: number[];
    creatorHash: number[];
    nonce: beet.bignum;
    index: number;
    message: MetadataArgs;
};
export declare const unverifyCreatorStruct: beet.FixableBeetArgsStruct<UnverifyCreatorInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type UnverifyCreatorInstructionAccounts = {
    treeAuthority: web3.PublicKey;
    leafOwner: web3.PublicKey;
    leafDelegate: web3.PublicKey;
    merkleTree: web3.PublicKey;
    payer: web3.PublicKey;
    creator: web3.PublicKey;
    logWrapper: web3.PublicKey;
    compressionProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const unverifyCreatorInstructionDiscriminator: number[];
export declare function createUnverifyCreatorInstruction(accounts: UnverifyCreatorInstructionAccounts, args: UnverifyCreatorInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
