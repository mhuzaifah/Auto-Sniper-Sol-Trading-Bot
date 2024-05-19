import type { Context } from './Context';
import type { RpcConfirmTransactionResult, RpcSendTransactionOptions } from './RpcInterface';
import type { Transaction, TransactionSignature } from './Transaction';
import { TransactionBuilder, TransactionBuilderSendAndConfirmOptions } from './TransactionBuilder';
export type TransactionBuilderGroupOptions = {
    /** Whether to run the builders in parallel or, if false, sequentially. */
    parallel?: boolean;
};
export declare class TransactionBuilderGroup {
    readonly builders: TransactionBuilder[];
    readonly options: TransactionBuilderGroupOptions;
    constructor(builders?: TransactionBuilder[], options?: TransactionBuilderGroupOptions);
    prepend(builder: TransactionBuilder | TransactionBuilder[]): TransactionBuilderGroup;
    append(builder: TransactionBuilder | TransactionBuilder[]): TransactionBuilderGroup;
    add(builder: TransactionBuilder | TransactionBuilder[]): TransactionBuilderGroup;
    sequential(): TransactionBuilderGroup;
    parallel(): TransactionBuilderGroup;
    isParallel(): boolean;
    merge(): TransactionBuilder;
    build(context: Pick<Context, 'transactions' | 'payer'>): Transaction[];
    setLatestBlockhash(context: Pick<Context, 'rpc'>): Promise<TransactionBuilderGroup>;
    buildWithLatestBlockhash(context: Pick<Context, 'transactions' | 'rpc' | 'payer'>): Promise<Transaction[]>;
    buildAndSign(context: Pick<Context, 'transactions' | 'rpc' | 'payer'>): Promise<Transaction[]>;
    send(context: Pick<Context, 'transactions' | 'rpc' | 'payer'>, options?: RpcSendTransactionOptions): Promise<TransactionSignature[]>;
    sendAndConfirm(context: Pick<Context, 'transactions' | 'rpc' | 'payer'>, options?: TransactionBuilderSendAndConfirmOptions): Promise<Array<{
        signature: TransactionSignature;
        result: RpcConfirmTransactionResult;
    }>>;
    map(fn: (builder: TransactionBuilder, index: number, array: TransactionBuilder[]) => TransactionBuilder): TransactionBuilderGroup;
    filter(fn: Parameters<Array<TransactionBuilder>['filter']>[0]): TransactionBuilderGroup;
    runAll<T, U>(array: T[], fn: (item: T, index: number, array: T[]) => Promise<U>): Promise<U[]>;
}
export declare function transactionBuilderGroup(builders?: TransactionBuilder[]): TransactionBuilderGroup;
