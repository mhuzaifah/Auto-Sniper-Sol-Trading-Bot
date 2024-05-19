import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const setTreeDelegateStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type SetTreeDelegateInstructionAccounts = {
    treeAuthority: web3.PublicKey;
    treeCreator: web3.PublicKey;
    newTreeDelegate: web3.PublicKey;
    merkleTree: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const setTreeDelegateInstructionDiscriminator: number[];
export declare function createSetTreeDelegateInstruction(accounts: SetTreeDelegateInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
