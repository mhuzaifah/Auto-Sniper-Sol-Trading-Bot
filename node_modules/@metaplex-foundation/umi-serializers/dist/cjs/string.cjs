'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var umiSerializersEncodings = require('@metaplex-foundation/umi-serializers-encodings');
var umiSerializersNumbers = require('@metaplex-foundation/umi-serializers-numbers');
var utils = require('./utils.cjs');

/**
 * Defines the options for string serializers.
 * @category Serializers
 */

/**
 * Creates a string serializer.
 *
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function string(options = {}) {
  const size = options.size ?? umiSerializersNumbers.u32();
  const encoding = options.encoding ?? umiSerializersEncodings.utf8;
  const description = options.description ?? `string(${encoding.description}; ${utils.getSizeDescription(size)})`;
  if (size === 'variable') {
    return {
      ...encoding,
      description
    };
  }
  if (typeof size === 'number') {
    return umiSerializersCore.fixSerializer(encoding, size, description);
  }
  return {
    description,
    fixedSize: null,
    maxSize: null,
    serialize: value => {
      const contentBytes = encoding.serialize(value);
      const lengthBytes = size.serialize(contentBytes.length);
      return umiSerializersCore.mergeBytes([lengthBytes, contentBytes]);
    },
    deserialize: (buffer, offset = 0) => {
      if (buffer.slice(offset).length === 0) {
        throw new umiSerializersCore.DeserializingEmptyBufferError('string');
      }
      const [lengthBigInt, lengthOffset] = size.deserialize(buffer, offset);
      const length = Number(lengthBigInt);
      offset = lengthOffset;
      const contentBuffer = buffer.slice(offset, offset + length);
      if (contentBuffer.length < length) {
        throw new umiSerializersCore.NotEnoughBytesError('string', length, contentBuffer.length);
      }
      const [value, contentOffset] = encoding.deserialize(contentBuffer);
      offset += contentOffset;
      return [value, offset];
    }
  };
}

exports.string = string;
//# sourceMappingURL=string.cjs.map
