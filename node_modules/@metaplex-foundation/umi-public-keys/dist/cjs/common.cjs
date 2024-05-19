'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersEncodings = require('@metaplex-foundation/umi-serializers-encodings');
var errors = require('./errors.cjs');

/**
 * The amount of bytes in a public key.
 * @category Signers and PublicKeys
 */
const PUBLIC_KEY_LENGTH = 32;

/**
 * Defines a public key as a base58 string.
 * @category Signers and PublicKeys
 */

function publicKey(input, assertValidPublicKey = true) {
  const key = (() => {
    if (typeof input === 'string') {
      return input;
    }
    // HasPublicKey.
    if (typeof input === 'object' && 'publicKey' in input) {
      return input.publicKey;
    }
    // LegacyWeb3JsPublicKey.
    if (typeof input === 'object' && 'toBase58' in input) {
      return input.toBase58();
    }
    // Pda.
    if (Array.isArray(input)) {
      return input[0];
    }
    // PublicKeyBytes.
    return umiSerializersEncodings.base58.deserialize(input)[0];
  })();
  if (assertValidPublicKey) {
    assertPublicKey(key);
  }
  return key;
}

/**
 * Creates the default public key which is composed of all zero bytes.
 * @category Signers and PublicKeys
 */
const defaultPublicKey = () => '11111111111111111111111111111111';

/**
 * Whether the given value is a valid public key.
 * @category Signers and PublicKeys
 */
const isPublicKey = value => {
  try {
    assertPublicKey(value);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Whether the given value is a valid program-derived address.
 * @category Signers and PublicKeys
 */
const isPda = value => Array.isArray(value) && value.length === 2 && typeof value[1] === 'number' && isPublicKey(value[0]);

/**
 * Ensures the given value is a valid public key.
 * @category Signers and PublicKeys
 */
function assertPublicKey(value) {
  // Check value type.
  if (typeof value !== 'string') {
    throw new errors.InvalidPublicKeyError(value, 'Public keys must be strings.');
  }

  // Check base58 encoding and byte length.
  publicKeyBytes(value);
}

/**
 * Deduplicates the given array of public keys.
 * @category Signers and PublicKeys
 */
const uniquePublicKeys = publicKeys => [...new Set(publicKeys)];

/**
 * Converts the given public key to a Uint8Array.
 * Throws an error if the public key is an invalid base58 string.
 * @category Signers and PublicKeys
 */
const publicKeyBytes = value => {
  // Check string length to avoid unnecessary base58 encoding.
  if (value.length < 32 || value.length > 44) {
    throw new errors.InvalidPublicKeyError(value, 'Public keys must be between 32 and 44 characters.');
  }

  // Check base58 encoding.
  let bytes;
  try {
    bytes = umiSerializersEncodings.base58.serialize(value);
  } catch (error) {
    throw new errors.InvalidPublicKeyError(value, 'Public keys must be base58 encoded.');
  }

  // Check byte length.
  if (bytes.length !== PUBLIC_KEY_LENGTH) {
    throw new errors.InvalidPublicKeyError(value, `Public keys must be ${PUBLIC_KEY_LENGTH} bytes.`);
  }
  return bytes;
};

/**
 * Converts the given public key to a base58 string.
 * @category Signers and PublicKeys
 * @deprecated Public keys are now represented directly as base58 strings.
 */
const base58PublicKey = key => publicKey(key);

/**
 * Whether the given public keys are the same.
 * @category Signers and PublicKeys
 * @deprecated Use `left === right` instead now that public keys are base58 strings.
 */
const samePublicKey = (left, right) => publicKey(left) === publicKey(right);

exports.PUBLIC_KEY_LENGTH = PUBLIC_KEY_LENGTH;
exports.assertPublicKey = assertPublicKey;
exports.base58PublicKey = base58PublicKey;
exports.defaultPublicKey = defaultPublicKey;
exports.isPda = isPda;
exports.isPublicKey = isPublicKey;
exports.publicKey = publicKey;
exports.publicKeyBytes = publicKeyBytes;
exports.samePublicKey = samePublicKey;
exports.uniquePublicKeys = uniquePublicKeys;
//# sourceMappingURL=common.cjs.map
