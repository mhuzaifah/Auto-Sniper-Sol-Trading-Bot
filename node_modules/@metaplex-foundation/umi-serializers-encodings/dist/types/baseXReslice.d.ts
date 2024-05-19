import type { Serializer } from '@metaplex-foundation/umi-serializers-core';
/**
 * A string serializer that reslices bytes into custom chunks
 * of bits that are then mapped to a custom alphabet.
 *
 * This can be used to create serializers whose alphabet
 * is a power of 2 such as base16 or base64.
 *
 * @category Serializers
 */
export declare const baseXReslice: (alphabet: string, bits: number) => Serializer<string>;
