import { mergeBytes } from '@metaplex-foundation/umi-serializers-core';
import { sumSerializerSizes } from './sumSerializerSizes.mjs';
import { InvalidNumberOfItemsError } from './errors.mjs';

/**
 * Defines the options for tuple serializers.
 * @category Serializers
 */

/**
 * Creates a serializer for a tuple-like array.
 *
 * @param items - The serializers to use for each item in the tuple.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function tuple(items, options = {}) {
  const itemDescriptions = items.map(item => item.description).join(', ');
  return {
    description: options.description ?? `tuple(${itemDescriptions})`,
    fixedSize: sumSerializerSizes(items.map(item => item.fixedSize)),
    maxSize: sumSerializerSizes(items.map(item => item.maxSize)),
    serialize: value => {
      if (value.length !== items.length) {
        throw new InvalidNumberOfItemsError('tuple', items.length, value.length);
      }
      return mergeBytes(items.map((item, index) => item.serialize(value[index])));
    },
    deserialize: (bytes, offset = 0) => {
      const values = [];
      items.forEach(serializer => {
        const [newValue, newOffset] = serializer.deserialize(bytes, offset);
        values.push(newValue);
        offset = newOffset;
      });
      return [values, offset];
    }
  };
}

export { tuple };
//# sourceMappingURL=tuple.mjs.map
