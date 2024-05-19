import { mergeBytes } from '@metaplex-foundation/umi-serializers-core';
import { u32 } from '@metaplex-foundation/umi-serializers-numbers';
import { InvalidNumberOfItemsError } from './errors.mjs';
import { getSizeDescription, getSizeFromChildren, getSizePrefix, getResolvedSize } from './utils.mjs';

/**
 * Defines the options for `Set` serializers.
 * @category Serializers
 */

/**
 * Creates a serializer for a set.
 *
 * @param item - The serializer to use for the set's items.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function set(item, options = {}) {
  const size = options.size ?? u32();
  return {
    description: options.description ?? `set(${item.description}; ${getSizeDescription(size)})`,
    fixedSize: getSizeFromChildren(size, [item.fixedSize]),
    maxSize: getSizeFromChildren(size, [item.maxSize]),
    serialize: set => {
      if (typeof size === 'number' && set.size !== size) {
        throw new InvalidNumberOfItemsError('set', size, set.size);
      }
      const itemBytes = Array.from(set, value => item.serialize(value));
      return mergeBytes([getSizePrefix(size, set.size), ...itemBytes]);
    },
    deserialize: (bytes, offset = 0) => {
      const set = new Set();
      if (typeof size === 'object' && bytes.slice(offset).length === 0) {
        return [set, offset];
      }
      if (size === 'remainder') {
        while (offset < bytes.length) {
          const [value, newOffset] = item.deserialize(bytes, offset);
          set.add(value);
          offset = newOffset;
        }
        return [set, offset];
      }
      const [resolvedSize, newOffset] = getResolvedSize(size, bytes, offset);
      offset = newOffset;
      for (let i = 0; i < resolvedSize; i += 1) {
        const [value, newOffset] = item.deserialize(bytes, offset);
        set.add(value);
        offset = newOffset;
      }
      return [set, offset];
    }
  };
}

export { set };
//# sourceMappingURL=set.mjs.map
