import { WrapInSerializer, Serializer, BaseSerializerOptions } from '@metaplex-foundation/umi-serializers-core';
/**
 * Defines the options for tuple serializers.
 * @category Serializers
 */
export type TupleSerializerOptions = BaseSerializerOptions;
/**
 * Creates a serializer for a tuple-like array.
 *
 * @param items - The serializers to use for each item in the tuple.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function tuple<T extends any[], U extends T = T>(items: WrapInSerializer<[...T], [...U]>, options?: TupleSerializerOptions): Serializer<T, U>;
