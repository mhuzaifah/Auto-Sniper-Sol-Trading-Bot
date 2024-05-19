import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
/**
 * Get the name and serializer of each field in a struct.
 * @category Serializers
 */
export type StructToSerializerTuple<T extends object, U extends T> = Array<{
    [K in keyof T]: [K, Serializer<T[K], U[K]>];
}[keyof T]>;
/**
 * Defines the options for struct serializers.
 * @category Serializers
 */
export type StructSerializerOptions = BaseSerializerOptions;
/**
 * Creates a serializer for a custom object.
 *
 * @param fields - The name and serializer of each field.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function struct<T extends object, U extends T = T>(fields: StructToSerializerTuple<T, U>, options?: StructSerializerOptions): Serializer<T, U>;
