import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type BurnInstructionArgs = {
    root: number[];
    dataHash: number[];
    creatorHash: number[];
    nonce: beet.bignum;
    index: number;
};
export declare const burnStruct: beet.BeetArgsStruct<BurnInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type BurnInstructionAccounts = {
    treeAuthority: web3.PublicKey;
    leafOwner: web3.PublicKey;
    leafDelegate: web3.PublicKey;
    merkleTree: web3.PublicKey;
    logWrapper: web3.PublicKey;
    compressionProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const burnInstructionDiscriminator: number[];
export declare function createBurnInstruction(accounts: BurnInstructionAccounts, args: BurnInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
