import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { MetadataArgs } from '../types/MetadataArgs';
export type VerifyCreatorInstructionArgs = {
    root: number[];
    dataHash: number[];
    creatorHash: number[];
    nonce: beet.bignum;
    index: number;
    message: MetadataArgs;
};
export declare const verifyCreatorStruct: beet.FixableBeetArgsStruct<VerifyCreatorInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type VerifyCreatorInstructionAccounts = {
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
export declare const verifyCreatorInstructionDiscriminator: number[];
export declare function createVerifyCreatorInstruction(accounts: VerifyCreatorInstructionAccounts, args: VerifyCreatorInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
