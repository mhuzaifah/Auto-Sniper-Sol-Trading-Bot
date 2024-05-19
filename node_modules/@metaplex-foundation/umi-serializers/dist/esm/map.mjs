import { mergeBytes } from '@metaplex-foundation/umi-serializers-core';
import { u32 } from '@metaplex-foundation/umi-serializers-numbers';
import { InvalidNumberOfItemsError } from './errors.mjs';
import { getSizeDescription, getSizeFromChildren, getSizePrefix, getResolvedSize } from './utils.mjs';

/**
 * Defines the options for `Map` serializers.
 * @category Serializers
 */

/**
 * Creates a serializer for a map.
 *
 * @param key - The serializer to use for the map's keys.
 * @param value - The serializer to use for the map's values.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function map(key, value, options = {}) {
  const size = options.size ?? u32();
  return {
    description: options.description ?? `map(${key.description}, ${value.description}; ${getSizeDescription(size)})`,
    fixedSize: getSizeFromChildren(size, [key.fixedSize, value.fixedSize]),
    maxSize: getSizeFromChildren(size, [key.maxSize, value.maxSize]),
    serialize: map => {
      if (typeof size === 'number' && map.size !== size) {
        throw new InvalidNumberOfItemsError('map', size, map.size);
      }
      const itemBytes = Array.from(map, ([k, v]) => mergeBytes([key.serialize(k), value.serialize(v)]));
      return mergeBytes([getSizePrefix(size, map.size), ...itemBytes]);
    },
    deserialize: (bytes, offset = 0) => {
      const map = new Map();
      if (typeof size === 'object' && bytes.slice(offset).length === 0) {
        return [map, offset];
      }
      if (size === 'remainder') {
        while (offset < bytes.length) {
          const [deserializedKey, kOffset] = key.deserialize(bytes, offset);
          offset = kOffset;
          const [deserializedValue, vOffset] = value.deserialize(bytes, offset);
          offset = vOffset;
          map.set(deserializedKey, deserializedValue);
        }
        return [map, offset];
      }
      const [resolvedSize, newOffset] = getResolvedSize(size, bytes, offset);
      offset = newOffset;
      for (let i = 0; i < resolvedSize; i += 1) {
        const [deserializedKey, kOffset] = key.deserialize(bytes, offset);
        offset = kOffset;
        const [deserializedValue, vOffset] = value.deserialize(bytes, offset);
        offset = vOffset;
        map.set(deserializedKey, deserializedValue);
      }
      return [map, offset];
    }
  };
}

export { map };
//# sourceMappingURL=map.mjs.map
