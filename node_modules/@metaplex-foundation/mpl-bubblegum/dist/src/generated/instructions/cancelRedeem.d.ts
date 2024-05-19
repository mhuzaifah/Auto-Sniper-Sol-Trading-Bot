import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type CancelRedeemInstructionArgs = {
    root: number[];
};
export declare const cancelRedeemStruct: beet.BeetArgsStruct<CancelRedeemInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type CancelRedeemInstructionAccounts = {
    treeAuthority: web3.PublicKey;
    leafOwner: web3.PublicKey;
    merkleTree: web3.PublicKey;
    voucher: web3.PublicKey;
    logWrapper: web3.PublicKey;
    compressionProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const cancelRedeemInstructionDiscriminator: number[];
export declare function createCancelRedeemInstruction(accounts: CancelRedeemInstructionAccounts, args: CancelRedeemInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
