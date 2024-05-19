import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const compressStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type CompressInstructionAccounts = {
    treeAuthority: web3.PublicKey;
    leafOwner: web3.PublicKey;
    leafDelegate: web3.PublicKey;
    merkleTree: web3.PublicKey;
    tokenAccount: web3.PublicKey;
    mint: web3.PublicKey;
    metadata: web3.PublicKey;
    masterEdition: web3.PublicKey;
    payer: web3.PublicKey;
    logWrapper: web3.PublicKey;
    compressionProgram: web3.PublicKey;
    tokenProgram?: web3.PublicKey;
    tokenMetadataProgram: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    anchorRemainingAccounts?: web3.AccountMeta[];
};
export declare const compressInstructionDiscriminator: number[];
export declare function createCompressInstruction(accounts: CompressInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
