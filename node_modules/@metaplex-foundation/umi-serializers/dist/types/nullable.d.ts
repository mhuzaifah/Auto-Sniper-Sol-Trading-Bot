import { Nullable } from '@metaplex-foundation/umi-options';
import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { NumberSerializer } from '@metaplex-foundation/umi-serializers-numbers';
/**
 * Defines the options for `Nullable` serializers.
 * @category Serializers
 */
export type NullableSerializerOptions = BaseSerializerOptions & {
    /**
     * The serializer to use for the boolean prefix.
     * @defaultValue `u8()`
     */
    prefix?: NumberSerializer;
    /**
     * Whether the item serializer should be of fixed size.
     *
     * When this is true, a `null` value will skip the bytes that would
     * have been used for the item. Note that this will only work if the
     * item serializer is of fixed size.
     * @defaultValue `false`
     */
    fixed?: boolean;
};
/**
 * Creates a serializer for an optional value using `null` as the `None` value.
 *
 * @param item - The serializer to use for the value that may be present.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function nullable<T, U extends T = T>(item: Serializer<T, U>, options?: NullableSerializerOptions): Serializer<Nullable<T>, Nullable<U>>;
