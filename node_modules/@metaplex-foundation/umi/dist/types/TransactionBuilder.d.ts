import { SolAmount } from './Amount';
import type { Context } from './Context';
import type { AccountMeta, Instruction, SignerMeta, WrappedInstruction } from './Instruction';
import type { RpcConfirmTransactionOptions, RpcConfirmTransactionResult, RpcGetLatestBlockhashOptions, RpcSendTransactionOptions } from './RpcInterface';
import { Signer } from './Signer';
import { AddressLookupTableInput, Blockhash, BlockhashWithExpiryBlockHeight, Transaction, TransactionSignature, TransactionVersion } from './Transaction';
/**
 * Defines an generic object with wrapped instructions,
 * such as a {@link TransactionBuilder}.
 * @category Transactions
 */
export type HasWrappedInstructions = {
    items: WrappedInstruction[];
};
/**
 * Defines all the possible inputs for adding items to a transaction builder.
 * @category Transactions
 */
export type TransactionBuilderItemsInput = WrappedInstruction | WrappedInstruction[] | HasWrappedInstructions | HasWrappedInstructions[];
/**
 * The available options of a transaction builder.
 * @category Transactions
 */
export type TransactionBuilderOptions = {
    /** The signer paying for the transaction fee. */
    feePayer?: Signer;
    /** The version of the transaction to build. */
    version?: TransactionVersion;
    /** The address lookup tables to attach to the built transaction. */
    addressLookupTables?: AddressLookupTableInput[];
    /** The blockhash that should be associated with the built transaction. */
    blockhash?: Blockhash | BlockhashWithExpiryBlockHeight;
};
/**
 * A set of options to use when sending and confirming
 * a transaction directly from a transaction builder.
 * @category Transactions
 */
export type TransactionBuilderSendAndConfirmOptions = {
    send?: RpcSendTransactionOptions;
    confirm?: Partial<RpcConfirmTransactionOptions>;
};
/**
 * A builder that helps construct transactions.
 * @category Transactions
 */
export declare class TransactionBuilder implements HasWrappedInstructions {
    readonly items: WrappedInstruction[];
    readonly options: TransactionBuilderOptions;
    constructor(items?: WrappedInstruction[], options?: TransactionBuilderOptions);
    empty(): TransactionBuilder;
    setItems(input: TransactionBuilderItemsInput): TransactionBuilder;
    prepend(input: TransactionBuilderItemsInput): TransactionBuilder;
    append(input: TransactionBuilderItemsInput): TransactionBuilder;
    add(input: TransactionBuilderItemsInput): TransactionBuilder;
    mapInstructions(fn: (wrappedInstruction: WrappedInstruction, index: number, array: WrappedInstruction[]) => WrappedInstruction): TransactionBuilder;
    addRemainingAccounts(accountMeta: AccountMeta | SignerMeta | (AccountMeta | SignerMeta)[], instructionIndex?: number): TransactionBuilder;
    splitByIndex(index: number): [TransactionBuilder, TransactionBuilder];
    /**
     * Split the builder into multiple builders, such that
     * each of them should fit in a single transaction.
     *
     * This method is unsafe for several reasons:
     * - Because transactions are atomic, splitting the builder
     *   into multiple transactions may cause undesired side effects.
     *   For example, if the first transaction succeeds but the second
     *   one fails, you may end up with an inconsistent account state.
     *   This is why it is recommended to manually split your transactions
     *   such that each of them is valid on its own.
     * - It can only split the instructions of the builder. Meaning that,
     *   if the builder has a single instruction that is too big to fit in
     *   a single transaction, it will not be able to split it.
     */
    unsafeSplitByTransactionSize(context: Pick<Context, 'transactions' | 'payer'>): TransactionBuilder[];
    setFeePayer(feePayer: Signer): TransactionBuilder;
    getFeePayer(context: Pick<Context, 'payer'>): Signer;
    setVersion(version: TransactionVersion): TransactionBuilder;
    useLegacyVersion(): TransactionBuilder;
    useV0(): TransactionBuilder;
    setAddressLookupTables(addressLookupTables: AddressLookupTableInput[]): TransactionBuilder;
    getBlockhash(): Blockhash | undefined;
    setBlockhash(blockhash: Blockhash | BlockhashWithExpiryBlockHeight): TransactionBuilder;
    setLatestBlockhash(context: Pick<Context, 'rpc'>, options?: RpcGetLatestBlockhashOptions): Promise<TransactionBuilder>;
    getInstructions(): Instruction[];
    getSigners(context: Pick<Context, 'payer'>): Signer[];
    getBytesCreatedOnChain(): number;
    getRentCreatedOnChain(context: Pick<Context, 'rpc'>): Promise<SolAmount>;
    getTransactionSize(context: Pick<Context, 'transactions' | 'payer'>): number;
    minimumTransactionsRequired(context: Pick<Context, 'transactions' | 'payer'>): number;
    fitsInOneTransaction(context: Pick<Context, 'transactions' | 'payer'>): boolean;
    build(context: Pick<Context, 'transactions' | 'payer'>): Transaction;
    buildWithLatestBlockhash(context: Pick<Context, 'transactions' | 'rpc' | 'payer'>, options?: RpcGetLatestBlockhashOptions): Promise<Transaction>;
    buildAndSign(context: Pick<Context, 'transactions' | 'rpc' | 'payer'>): Promise<Transaction>;
    send(context: Pick<Context, 'transactions' | 'rpc' | 'payer'>, options?: RpcSendTransactionOptions): Promise<TransactionSignature>;
    confirm(context: Pick<Context, 'transactions' | 'rpc' | 'payer'>, signature: TransactionSignature, options?: Partial<RpcConfirmTransactionOptions>): Promise<RpcConfirmTransactionResult>;
    sendAndConfirm(context: Pick<Context, 'transactions' | 'rpc' | 'payer'>, options?: TransactionBuilderSendAndConfirmOptions): Promise<{
        signature: TransactionSignature;
        result: RpcConfirmTransactionResult;
    }>;
    protected parseItems(input: TransactionBuilderItemsInput): WrappedInstruction[];
}
/**
 * Creates a new transaction builder.
 * @category Transactions
 */
export declare const transactionBuilder: (items?: WrappedInstruction[]) => TransactionBuilder;
