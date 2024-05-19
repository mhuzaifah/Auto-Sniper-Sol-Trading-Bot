import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { MetadataArgs } from '../types/MetadataArgs';
export type DecompressV1InstructionArgs = {
    metadata: MetadataArgs;
};
export declare const decompressV1Struct: beet.FixableBeetArgsStruct<DecompressV1InstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type DecompressV1InstructionAccounts = {
    voucher: web3.PublicKey;
    leafOwner: web3.PublicKey;
    tokenAccount: web3.PublicKey;
    mint: web3.PublicKey;
    mintAuthority: web3.PublicKey;
    metadata: web3.PublicKey;
    masterEdition: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    sysvarRent: web3.PublicKey;
    tokenMetadataProgram: web3.PublicKey;
    tokenProgram?: web3.PublicKey;
    associatedTokenProgram: web3.PublicKey;
    logWrapper: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const decompressV1InstructionDiscriminator: number[];
export declare function createDecompressV1Instruction(accounts: DecompressV1InstructionAccounts, args: DecompressV1InstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
