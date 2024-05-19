'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var umiSerializersNumbers = require('@metaplex-foundation/umi-serializers-numbers');

/**
 * Defines the options for boolean serializers.
 * @category Serializers
 */

/**
 * Creates a boolean serializer.
 *
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function bool(options = {}) {
  const size = options.size ?? umiSerializersNumbers.u8();
  if (size.fixedSize === null) {
    throw new umiSerializersCore.ExpectedFixedSizeSerializerError('Serializer [bool] requires a fixed size.');
  }
  return {
    description: options.description ?? `bool(${size.description})`,
    fixedSize: size.fixedSize,
    maxSize: size.fixedSize,
    serialize: value => size.serialize(value ? 1 : 0),
    deserialize: (bytes, offset = 0) => {
      if (bytes.slice(offset).length === 0) {
        throw new umiSerializersCore.DeserializingEmptyBufferError('bool');
      }
      const [value, vOffset] = size.deserialize(bytes, offset);
      return [value === 1, vOffset];
    }
  };
}

exports.bool = bool;
//# sourceMappingURL=bool.cjs.map
