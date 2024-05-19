'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiPublicKeys = require('@metaplex-foundation/umi-public-keys');
var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');

/**
 * Defines the options for `PublicKey` serializers.
 * @category Serializers
 */

/**
 * Creates a serializer for base58 encoded public keys.
 *
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function publicKey(options = {}) {
  return {
    description: options.description ?? 'publicKey',
    fixedSize: 32,
    maxSize: 32,
    serialize: value => umiPublicKeys.publicKeyBytes(umiPublicKeys.publicKey(value)),
    deserialize: (bytes, offset = 0) => {
      const pubkeyBytes = bytes.slice(offset, offset + 32);
      if (pubkeyBytes.length === 0) {
        throw new umiSerializersCore.DeserializingEmptyBufferError('publicKey');
      }
      if (pubkeyBytes.length < umiPublicKeys.PUBLIC_KEY_LENGTH) {
        throw new umiSerializersCore.NotEnoughBytesError('publicKey', umiPublicKeys.PUBLIC_KEY_LENGTH, pubkeyBytes.length);
      }
      return [umiPublicKeys.publicKey(pubkeyBytes), offset + 32];
    }
  };
}

exports.publicKey = publicKey;
//# sourceMappingURL=publicKey.cjs.map
