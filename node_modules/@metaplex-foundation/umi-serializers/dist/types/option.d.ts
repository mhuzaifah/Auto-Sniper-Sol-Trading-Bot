import { Option, OptionOrNullable } from '@metaplex-foundation/umi-options';
import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { NumberSerializer } from '@metaplex-foundation/umi-serializers-numbers';
/**
 * Defines the options for `Option` serializers.
 * @category Serializers
 */
export type OptionSerializerOptions = BaseSerializerOptions & {
    /**
     * The serializer to use for the boolean prefix.
     * @defaultValue `u8()`
     */
    prefix?: NumberSerializer;
    /**
     * Whether the item serializer should be of fixed size.
     *
     * When this is true, a `None` value will skip the bytes that would
     * have been used for the item. Note that this will only work if the
     * item serializer is of fixed size.
     * @defaultValue `false`
     */
    fixed?: boolean;
};
/**
 * Creates a serializer for an optional value using the {@link Option} type.
 *
 * @param item - The serializer to use for the value that may be present.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function option<T, U extends T = T>(item: Serializer<T, U>, options?: OptionSerializerOptions): Serializer<OptionOrNullable<T>, Option<U>>;
