import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { ArrayLikeSerializerSize } from './arrayLikeSerializerSize';
/**
 * Defines the options for `Map` serializers.
 * @category Serializers
 */
export type MapSerializerOptions = BaseSerializerOptions & {
    /**
     * The size of the map.
     * @defaultValue `u32()`
     */
    size?: ArrayLikeSerializerSize;
};
/**
 * Creates a serializer for a map.
 *
 * @param key - The serializer to use for the map's keys.
 * @param value - The serializer to use for the map's values.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function map<TK, TV, UK extends TK = TK, UV extends TV = TV>(key: Serializer<TK, UK>, value: Serializer<TV, UV>, options?: MapSerializerOptions): Serializer<Map<TK, TV>, Map<UK, UV>>;
