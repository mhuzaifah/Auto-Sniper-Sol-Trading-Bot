'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var umiSerializersNumbers = require('@metaplex-foundation/umi-serializers-numbers');
var errors = require('./errors.cjs');
var utils = require('./utils.cjs');

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
  const size = options.size ?? umiSerializersNumbers.u32();
  return {
    description: options.description ?? `set(${item.description}; ${utils.getSizeDescription(size)})`,
    fixedSize: utils.getSizeFromChildren(size, [item.fixedSize]),
    maxSize: utils.getSizeFromChildren(size, [item.maxSize]),
    serialize: set => {
      if (typeof size === 'number' && set.size !== size) {
        throw new errors.InvalidNumberOfItemsError('set', size, set.size);
      }
      const itemBytes = Array.from(set, value => item.serialize(value));
      return umiSerializersCore.mergeBytes([utils.getSizePrefix(size, set.size), ...itemBytes]);
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
      const [resolvedSize, newOffset] = utils.getResolvedSize(size, bytes, offset);
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

exports.set = set;
//# sourceMappingURL=set.cjs.map
