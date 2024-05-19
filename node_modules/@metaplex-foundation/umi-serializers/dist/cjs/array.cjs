'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var umiSerializersNumbers = require('@metaplex-foundation/umi-serializers-numbers');
var errors = require('./errors.cjs');
var utils = require('./utils.cjs');

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
  const size = options.size ?? umiSerializersNumbers.u32();
  return {
    description: options.description ?? `array(${item.description}; ${utils.getSizeDescription(size)})`,
    fixedSize: utils.getSizeFromChildren(size, [item.fixedSize]),
    maxSize: utils.getSizeFromChildren(size, [item.maxSize]),
    serialize: value => {
      if (typeof size === 'number' && value.length !== size) {
        throw new errors.InvalidNumberOfItemsError('array', size, value.length);
      }
      return umiSerializersCore.mergeBytes([utils.getSizePrefix(size, value.length), ...value.map(v => item.serialize(v))]);
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
      const [resolvedSize, newOffset] = utils.getResolvedSize(size, bytes, offset);
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

exports.array = array;
//# sourceMappingURL=array.cjs.map
