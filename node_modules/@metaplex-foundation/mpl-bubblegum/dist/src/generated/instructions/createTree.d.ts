import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type CreateTreeInstructionArgs = {
    maxDepth: number;
    maxBufferSize: number;
    public: beet.COption<boolean>;
};
export declare const createTreeStruct: beet.FixableBeetArgsStruct<CreateTreeInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type CreateTreeInstructionAccounts = {
    treeAuthority: web3.PublicKey;
    merkleTree: web3.PublicKey;
    payer: web3.PublicKey;
    treeCreator: web3.PublicKey;
    logWrapper: web3.PublicKey;
    compressionProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const createTreeInstructionDiscriminator: number[];
export declare function createCreateTreeInstruction(accounts: CreateTreeInstructionAccounts, args: CreateTreeInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
