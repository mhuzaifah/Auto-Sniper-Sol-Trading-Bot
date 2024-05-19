import { fixSerializer, mergeBytes, DeserializingEmptyBufferError, NotEnoughBytesError } from '@metaplex-foundation/umi-serializers-core';
import { getSizeDescription } from './utils.mjs';

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
  const description = options.description ?? `bytes(${getSizeDescription(size)})`;
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
    return fixSerializer(byteSerializer, size, description);
  }
  return {
    description,
    fixedSize: null,
    maxSize: null,
    serialize: value => {
      const contentBytes = byteSerializer.serialize(value);
      const lengthBytes = size.serialize(contentBytes.length);
      return mergeBytes([lengthBytes, contentBytes]);
    },
    deserialize: (buffer, offset = 0) => {
      if (buffer.slice(offset).length === 0) {
        throw new DeserializingEmptyBufferError('bytes');
      }
      const [lengthBigInt, lengthOffset] = size.deserialize(buffer, offset);
      const length = Number(lengthBigInt);
      offset = lengthOffset;
      const contentBuffer = buffer.slice(offset, offset + length);
      if (contentBuffer.length < length) {
        throw new NotEnoughBytesError('bytes', length, contentBuffer.length);
      }
      const [value, contentOffset] = byteSerializer.deserialize(contentBuffer);
      offset += contentOffset;
      return [value, offset];
    }
  };
}

export { bytes };
//# sourceMappingURL=bytes.mjs.map
