import { PublicKey } from "@solana/web3.js";

export interface PoolInfo {
    id: PublicKey;
    baseMint: PublicKey;
    quoteMint: PublicKey;
    lpMint: PublicKey;
    baseDecimals: number;
    quoteDecimals: number;
    lpDecimals: number;
    version: number;
    programId: PublicKey;
    authority: PublicKey;
    openOrders: PublicKey;
    targetOrders: PublicKey;
    baseVault: PublicKey;
    quoteVault: PublicKey;
    withdrawQueue: PublicKey;
    lpVault: PublicKey;
    marketVersion: number;
    marketProgramId: PublicKey;
    marketId: PublicKey;
}