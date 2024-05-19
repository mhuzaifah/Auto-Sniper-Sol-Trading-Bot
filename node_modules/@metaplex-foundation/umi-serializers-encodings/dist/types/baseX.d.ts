import type { Serializer } from '@metaplex-foundation/umi-serializers-core';
/**
 * A string serializer that requires a custom alphabet and uses
 * the length of that alphabet as the base. It then divides
 * the input by the base as many times as necessary to get
 * the output. It also supports leading zeroes by using the
 * first character of the alphabet as the zero character.
 *
 * This can be used to create serializers such as base10 or base58.
 *
 * @category Serializers
 */
export declare const baseX: (alphabet: string) => Serializer<string>;
