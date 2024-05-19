'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var utils = require('./utils.cjs');

/**
 * Defines the options for bytes serializers.
 * @category Serializers
 */

/**
 * Creates a serializer that passes the buffer as-is.
 *
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function bytes(options = {}) {
  const size = options.size ?? 'variable';
  const description = options.description ?? `bytes(${utils.getSizeDescription(size)})`;
  const byteSerializer = {
    description,
    fixedSize: null,
    maxSize: null,
    serialize: value => new Uint8Array(value),
    deserialize: (bytes, offset = 0) => {
      const slice = bytes.slice(offset);
      return [slice, offset + slice.length];
    }
  };
  if (size === 'variable') {
    return byteSerializer;
  }
  if (typeof size === 'number') {
    return umiSerializersCore.fixSerializer(byteSerializer, size, description);
  }
  return {
    description,
    fixedSize: null,
    maxSize: null,
    serialize: value => {
      const contentBytes = byteSerializer.serialize(value);
      const lengthBytes = size.serialize(contentBytes.length);
      return umiSerializersCore.mergeBytes([lengthBytes, contentBytes]);
    },
    deserialize: (buffer, offset = 0) => {
      if (buffer.slice(offset).length === 0) {
        throw new umiSerializersCore.DeserializingEmptyBufferError('bytes');
      }
      const [lengthBigInt, lengthOffset] = size.deserialize(buffer, offset);
      const length = Number(lengthBigInt);
      offset = lengthOffset;
      const contentBuffer = buffer.slice(offset, offset + length);
      if (contentBuffer.length < length) {
        throw new umiSerializersCore.NotEnoughBytesError('bytes', length, contentBuffer.length);
      }
      const [value, contentOffset] = byteSerializer.deserialize(contentBuffer);
      offset += contentOffset;
      return [value, offset];
    }
  };
}

exports.bytes = bytes;
//# sourceMappingURL=bytes.cjs.map
