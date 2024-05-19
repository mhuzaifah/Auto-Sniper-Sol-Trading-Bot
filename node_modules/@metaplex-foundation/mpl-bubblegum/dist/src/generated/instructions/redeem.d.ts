import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type RedeemInstructionArgs = {
    root: number[];
    dataHash: number[];
    creatorHash: number[];
    nonce: beet.bignum;
    index: number;
};
export declare const redeemStruct: beet.BeetArgsStruct<RedeemInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type RedeemInstructionAccounts = {
    treeAuthority: web3.PublicKey;
    leafOwner: web3.PublicKey;
    leafDelegate: web3.PublicKey;
    merkleTree: web3.PublicKey;
    voucher: web3.PublicKey;
    logWrapper: web3.PublicKey;
    compressionProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const redeemInstructionDiscriminator: number[];
export declare function createRedeemInstruction(accounts: RedeemInstructionAccounts, args: RedeemInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
