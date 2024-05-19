import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { ArrayLikeSerializerSize } from './arrayLikeSerializerSize';
/**
 * Defines the options for `Set` serializers.
 * @category Serializers
 */
export type SetSerializerOptions = BaseSerializerOptions & {
    /**
     * The size of the set.
     * @defaultValue `u32()`
     */
    size?: ArrayLikeSerializerSize;
};
/**
 * Creates a serializer for a set.
 *
 * @param item - The serializer to use for the set's items.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function set<T, U extends T = T>(item: Serializer<T, U>, options?: SetSerializerOptions): Serializer<Set<T>, Set<U>>;
