import type { Serializer } from '@metaplex-foundation/umi-serializers-core';
/**
 * A string serializer that uses UTF-8 encoding
 * using the native `TextEncoder` API.
 * @category Serializers
 */
export declare const utf8: Serializer<string>;
