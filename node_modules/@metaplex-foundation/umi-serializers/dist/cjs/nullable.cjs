'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var umiSerializersNumbers = require('@metaplex-foundation/umi-serializers-numbers');
var sumSerializerSizes = require('./sumSerializerSizes.cjs');
var utils = require('./utils.cjs');

/**
 * Defines the options for `Nullable` serializers.
 * @category Serializers
 */

/**
 * Creates a serializer for an optional value using `null` as the `None` value.
 *
 * @param item - The serializer to use for the value that may be present.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function nullable(item, options = {}) {
  const prefix = options.prefix ?? umiSerializersNumbers.u8();
  const fixed = options.fixed ?? false;
  let descriptionSuffix = `; ${utils.getSizeDescription(prefix)}`;
  let fixedSize = item.fixedSize === 0 ? prefix.fixedSize : null;
  if (fixed) {
    if (item.fixedSize === null || prefix.fixedSize === null) {
      throw new umiSerializersCore.ExpectedFixedSizeSerializerError('Fixed nullables can only be used with fixed-size serializers');
    }
    descriptionSuffix += '; fixed';
    fixedSize = prefix.fixedSize + item.fixedSize;
  }
  return {
    description: options.description ?? `nullable(${item.description + descriptionSuffix})`,
    fixedSize,
    maxSize: sumSerializerSizes.sumSerializerSizes([prefix.maxSize, item.maxSize]),
    serialize: option => {
      const prefixByte = prefix.serialize(Number(option !== null));
      if (fixed) {
        const itemFixedSize = item.fixedSize;
        const itemBytes = option !== null ? item.serialize(option).slice(0, itemFixedSize) : new Uint8Array(itemFixedSize).fill(0);
        return umiSerializersCore.mergeBytes([prefixByte, itemBytes]);
      }
      const itemBytes = option !== null ? item.serialize(option) : new Uint8Array();
      return umiSerializersCore.mergeBytes([prefixByte, itemBytes]);
    },
    deserialize: (bytes, offset = 0) => {
      if (bytes.slice(offset).length === 0) {
        return [null, offset];
      }
      const fixedOffset = offset + (prefix.fixedSize ?? 0) + (item.fixedSize ?? 0);
      const [isSome, prefixOffset] = prefix.deserialize(bytes, offset);
      offset = prefixOffset;
      if (isSome === 0) {
        return [null, fixed ? fixedOffset : offset];
      }
      const [value, newOffset] = item.deserialize(bytes, offset);
      offset = newOffset;
      return [value, fixed ? fixedOffset : offset];
    }
  };
}

exports.nullable = nullable;
//# sourceMappingURL=nullable.cjs.map
