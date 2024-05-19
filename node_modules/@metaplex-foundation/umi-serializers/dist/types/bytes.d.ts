import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { NumberSerializer } from '@metaplex-foundation/umi-serializers-numbers';
/**
 * Defines the options for bytes serializers.
 * @category Serializers
 */
export type BytesSerializerOptions = BaseSerializerOptions & {
    /**
     * The size of the buffer. It can be one of the following:
     * - a {@link NumberSerializer} that prefixes the buffer with its size.
     * - a fixed number of bytes.
     * - or `'variable'` to use the rest of the buffer.
     * @defaultValue `'variable'`
     */
    size?: NumberSerializer | number | 'variable';
};
/**
 * Creates a serializer that passes the buffer as-is.
 *
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function bytes(options?: BytesSerializerOptions): Serializer<Uint8Array>;
