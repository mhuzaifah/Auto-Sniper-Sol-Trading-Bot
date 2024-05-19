import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
/**
 * Defines the options for the shortU16 serializer.
 * @category Serializers
 */
export type ShortU16SerializerOptions = BaseSerializerOptions;
/**
 * Same as u16, but serialized with 1 to 3 bytes.
 *
 * If the value is above 0x7f, the top bit is set and the remaining
 * value is stored in the next bytes. Each byte follows the same
 * pattern until the 3rd byte. The 3rd byte, if needed, uses
 * all 8 bits to store the last byte of the original value.
 *
 * @category Serializers
 */
export declare const shortU16: (options?: ShortU16SerializerOptions) => Serializer<number>;
