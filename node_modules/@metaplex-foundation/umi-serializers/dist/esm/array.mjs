import { mergeBytes } from '@metaplex-foundation/umi-serializers-core';
import { u32 } from '@metaplex-foundation/umi-serializers-numbers';
import { InvalidNumberOfItemsError } from './errors.mjs';
import { getSizeDescription, getSizeFromChildren, getSizePrefix, getResolvedSize } from './utils.mjs';

/**
 * Defines the options for array serializers.
 * @category Serializers
 */

/**
 * Creates a serializer for an array of items.
 *
 * @param item - The serializer to use for the array's items.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function array(item, options = {}) {
  const size = options.size ?? u32();
  return {
    description: options.description ?? `array(${item.description}; ${getSizeDescription(size)})`,
    fixedSize: getSizeFromChildren(size, [item.fixedSize]),
    maxSize: getSizeFromChildren(size, [item.maxSize]),
    serialize: value => {
      if (typeof size === 'number' && value.length !== size) {
        throw new InvalidNumberOfItemsError('array', size, value.length);
      }
      return mergeBytes([getSizePrefix(size, value.length), ...value.map(v => item.serialize(v))]);
    },
    deserialize: (bytes, offset = 0) => {
      const values = [];
      if (typeof size === 'object' && bytes.slice(offset).length === 0) {
        return [values, offset];
      }
      if (size === 'remainder') {
        while (offset < bytes.length) {
          const [value, newOffset] = item.deserialize(bytes, offset);
          values.push(value);
          offset = newOffset;
        }
        return [values, offset];
      }
      const [resolvedSize, newOffset] = getResolvedSize(size, bytes, offset);
      offset = newOffset;
      for (let i = 0; i < resolvedSize; i += 1) {
        const [value, newOffset] = item.deserialize(bytes, offset);
        values.push(value);
        offset = newOffset;
      }
      return [values, offset];
    }
  };
}

export { array };
//# sourceMappingURL=array.mjs.map
