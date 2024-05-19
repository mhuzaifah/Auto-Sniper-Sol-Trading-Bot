import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { ArrayLikeSerializerSize } from './arrayLikeSerializerSize';
/**
 * Defines the options for array serializers.
 * @category Serializers
 */
export type ArraySerializerOptions = BaseSerializerOptions & {
    /**
     * The size of the array.
     * @defaultValue `u32()`
     */
    size?: ArrayLikeSerializerSize;
};
/**
 * Creates a serializer for an array of items.
 *
 * @param item - The serializer to use for the array's items.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function array<T, U extends T = T>(item: Serializer<T, U>, options?: ArraySerializerOptions): Serializer<T[], U[]>;
