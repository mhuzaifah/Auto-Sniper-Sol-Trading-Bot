import { PublicKey, PublicKeyInput } from '@metaplex-foundation/umi-public-keys';
import { Transaction } from './Transaction';
/**
 * Defines a public key that can sign transactions and messages.
 * @category Context and Interfaces
 */
export interface Signer {
    /** The public key of the Signer. */
    readonly publicKey: PublicKey;
    /** Signs the given message. */
    readonly signMessage: (message: Uint8Array) => Promise<Uint8Array>;
    /** Signs the given transaction. */
    readonly signTransaction: (transaction: Transaction) => Promise<Transaction>;
    /** Signs all the given transactions at once. */
    readonly signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
}
/**
 * Signs a transaction using the provided signers.
 * @category Signers and PublicKeys
 */
export declare const signTransaction: (transaction: Transaction, signers: Signer[]) => Promise<Transaction>;
/**
 * Signs multiple transactions using the provided signers
 * such that signers that need to sign multiple transactions
 * sign them all at once using the `signAllTransactions` method.
 *
 * @category Signers and PublicKeys
 */
export declare const signAllTransactions: (transactionsWithSigners: {
    transaction: Transaction;
    signers: Signer[];
}[]) => Promise<Transaction[]>;
/**
 * Whether the provided value is a `Signer`.
 * @category Signers and PublicKeys
 */
export declare const isSigner: (value: PublicKeyInput | Signer) => value is Signer;
/**
 * Deduplicates the provided signers by public key.
 * @category Signers and PublicKeys
 */
export declare const uniqueSigners: (signers: Signer[]) => Signer[];
/**
 * Creates a `Signer` that, when required to sign, does nothing.
 * This can be useful when libraries require a `Signer` but
 * we don't have one in the current environment. For example,
 * if the transaction will then be signed in a backend server.
 *
 * @category Signers and PublicKeys
 */
export declare const createNoopSigner: (publicKey: PublicKey) => Signer;
/**
 * Creates a `Signer` that, when required to sign, throws an error.
 * @category Signers and PublicKeys
 */
export declare function createNullSigner(): Signer;
