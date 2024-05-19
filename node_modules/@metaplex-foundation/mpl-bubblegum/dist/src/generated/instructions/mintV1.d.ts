import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { MetadataArgs } from '../types/MetadataArgs';
export type MintV1InstructionArgs = {
    message: MetadataArgs;
};
export declare const mintV1Struct: beet.FixableBeetArgsStruct<MintV1InstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type MintV1InstructionAccounts = {
    treeAuthority: web3.PublicKey;
    leafOwner: web3.PublicKey;
    leafDelegate: web3.PublicKey;
    merkleTree: web3.PublicKey;
    payer: web3.PublicKey;
    treeDelegate: web3.PublicKey;
    logWrapper: web3.PublicKey;
    compressionProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const mintV1InstructionDiscriminator: number[];
export declare function createMintV1Instruction(accounts: MintV1InstructionAccounts, args: MintV1InstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
