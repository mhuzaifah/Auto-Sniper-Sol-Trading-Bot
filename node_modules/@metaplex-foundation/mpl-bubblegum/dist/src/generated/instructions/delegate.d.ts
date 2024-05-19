import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type DelegateInstructionArgs = {
    root: number[];
    dataHash: number[];
    creatorHash: number[];
    nonce: beet.bignum;
    index: number;
};
export declare const delegateStruct: beet.BeetArgsStruct<DelegateInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type DelegateInstructionAccounts = {
    treeAuthority: web3.PublicKey;
    leafOwner: web3.PublicKey;
    previousLeafDelegate: web3.PublicKey;
    newLeafDelegate: web3.PublicKey;
    merkleTree: web3.PublicKey;
    logWrapper: web3.PublicKey;
    compressionProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const delegateInstructionDiscriminator: number[];
export declare function createDelegateInstruction(accounts: DelegateInstructionAccounts, args: DelegateInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
