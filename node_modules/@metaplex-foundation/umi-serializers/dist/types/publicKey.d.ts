import { PublicKey, PublicKeyInput } from '@metaplex-foundation/umi-public-keys';
import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
/**
 * Defines the options for `PublicKey` serializers.
 * @category Serializers
 */
export type PublicKeySerializerOptions = BaseSerializerOptions;
/**
 * Creates a serializer for base58 encoded public keys.
 *
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function publicKey(options?: PublicKeySerializerOptions): Serializer<PublicKeyInput, PublicKey>;
