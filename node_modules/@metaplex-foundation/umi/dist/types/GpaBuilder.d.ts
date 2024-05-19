import { PublicKey } from '@metaplex-foundation/umi-public-keys';
import type { Serializer, StructToSerializerTuple } from '@metaplex-foundation/umi-serializers';
import type { RpcAccount } from './Account';
import type { Context } from './Context';
import type { RpcDataFilter, RpcDataSlice, RpcGetProgramAccountsOptions } from './RpcInterface';
/**
 * Callback for sorting raw accounts from `getProgramAccounts` RPC requests.
 * @category Utils — GpaBuilder
 */
export type GpaBuilderSortCallback = (a: RpcAccount, b: RpcAccount) => number;
/**
 * Callback for mapping raw accounts into any type.
 * @category Utils — GpaBuilder
 */
export type GpaBuilderMapCallback<T> = (account: RpcAccount) => T;
/**
 * Get the GPA field offsets and serializers from their object definition.
 * @category Utils — GpaBuilder
 */
export type GpaBuilderFieldSerializers<T extends object, U extends T> = {
    [K in keyof T]: [number | null, Serializer<T[K], U[K]>];
};
/**
 * Builder for `getProgramAccounts` RPC requests.
 * @category Utils — GpaBuilder
 */
export declare class GpaBuilder<Account extends object = RpcAccount, Fields extends object = {}> {
    protected readonly context: Pick<Context, 'rpc'>;
    readonly programId: PublicKey;
    readonly options: {
        readonly fields?: GpaBuilderFieldSerializers<Fields, Fields>;
        readonly deserializeCallback?: GpaBuilderMapCallback<Account>;
        readonly dataSlice?: RpcDataSlice;
        readonly filters?: RpcDataFilter[];
        readonly sortCallback?: GpaBuilderSortCallback;
    };
    constructor(context: Pick<Context, 'rpc'>, programId: PublicKey, options?: {
        readonly fields?: GpaBuilderFieldSerializers<Fields, Fields>;
        readonly deserializeCallback?: GpaBuilderMapCallback<Account>;
        readonly dataSlice?: RpcDataSlice;
        readonly filters?: RpcDataFilter[];
        readonly sortCallback?: GpaBuilderSortCallback;
    });
    reset(): GpaBuilder<Account, Fields>;
    registerFields<T extends object>(fields: GpaBuilderFieldSerializers<T, T>): GpaBuilder<Account, T>;
    registerFieldsFromStruct<T extends object>(structFields: StructToSerializerTuple<T, T>): GpaBuilder<Account, T>;
    deserializeUsing<T extends object>(callback: GpaBuilderMapCallback<T>): GpaBuilder<T, Fields>;
    slice(offset: number, length: number): GpaBuilder<Account, Fields>;
    sliceField(field: keyof Fields, offset?: number): GpaBuilder<Account, Fields>;
    withoutData(): GpaBuilder<Account, Fields>;
    addFilter(...filters: RpcDataFilter[]): GpaBuilder<Account, Fields>;
    where(offset: number, data: string | bigint | number | boolean | Uint8Array | PublicKey): GpaBuilder<Account, Fields>;
    whereField<K extends keyof Fields>(field: K, data: Fields[K], offset?: number): GpaBuilder<Account, Fields>;
    whereSize(dataSize: number): GpaBuilder<Account, Fields>;
    sortUsing(callback: GpaBuilderSortCallback): GpaBuilder<Account, Fields>;
    get(options?: RpcGetProgramAccountsOptions): Promise<RpcAccount[]>;
    getAndMap<T>(callback: GpaBuilderMapCallback<T>, options?: RpcGetProgramAccountsOptions): Promise<T[]>;
    getDeserialized(options?: RpcGetProgramAccountsOptions): Promise<Account[]>;
    getPublicKeys(options?: RpcGetProgramAccountsOptions): Promise<PublicKey[]>;
    getDataAsPublicKeys(options?: RpcGetProgramAccountsOptions): Promise<PublicKey[]>;
    protected getField<K extends keyof Fields>(fieldName: K, forcedOffset?: number): [number, Serializer<Fields[K]>];
}
/**
 * Creates a new {@link GpaBuilder} instance.
 * @category Utils — GpaBuilder
 */
export declare const gpaBuilder: (context: Pick<Context, 'rpc'>, programId: PublicKey) => GpaBuilder;
