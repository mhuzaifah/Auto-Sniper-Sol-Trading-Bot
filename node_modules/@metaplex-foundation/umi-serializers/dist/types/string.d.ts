import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { NumberSerializer } from '@metaplex-foundation/umi-serializers-numbers';
/**
 * Defines the options for string serializers.
 * @category Serializers
 */
export type StringSerializerOptions = BaseSerializerOptions & {
    /**
     * The size of the string. It can be one of the following:
     * - a {@link NumberSerializer} that prefixes the string with its size.
     * - a fixed number of bytes.
     * - or `'variable'` to use the rest of the buffer.
     * @defaultValue `u32()`
     */
    size?: NumberSerializer | number | 'variable';
    /**
     * The string serializer to use for encoding and decoding the content.
     * @defaultValue `utf8`
     */
    encoding?: Serializer<string>;
};
/**
 * Creates a string serializer.
 *
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function string(options?: StringSerializerOptions): Serializer<string>;
