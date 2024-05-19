import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
/**
 * Defines the options for bitArray serializers.
 * @category Serializers
 */
export type BitArraySerializerOptions = BaseSerializerOptions & {
    /**
     * Whether to read the bits in reverse order.
     * @defaultValue `false`
     */
    backward?: boolean;
};
/**
 * An array of boolean serializer that
 * converts booleans to bits and vice versa.
 *
 * @param size - The amount of bytes to use for the bit array.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare const bitArray: (size: number, options?: BitArraySerializerOptions | boolean) => Serializer<boolean[]>;
