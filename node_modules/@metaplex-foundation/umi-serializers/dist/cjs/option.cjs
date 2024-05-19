'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiOptions = require('@metaplex-foundation/umi-options');
var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var umiSerializersNumbers = require('@metaplex-foundation/umi-serializers-numbers');
var sumSerializerSizes = require('./sumSerializerSizes.cjs');
var utils = require('./utils.cjs');

/**
 * Defines the options for `Option` serializers.
 * @category Serializers
 */

/**
 * Creates a serializer for an optional value using the {@link Option} type.
 *
 * @param item - The serializer to use for the value that may be present.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function option(item, options = {}) {
  const prefix = options.prefix ?? umiSerializersNumbers.u8();
  const fixed = options.fixed ?? false;
  let descriptionSuffix = `; ${utils.getSizeDescription(prefix)}`;
  let fixedSize = item.fixedSize === 0 ? prefix.fixedSize : null;
  if (fixed) {
    if (item.fixedSize === null || prefix.fixedSize === null) {
      throw new umiSerializersCore.ExpectedFixedSizeSerializerError('Fixed options can only be used with fixed-size serializers');
    }
    descriptionSuffix += '; fixed';
    fixedSize = prefix.fixedSize + item.fixedSize;
  }
  return {
    description: options.description ?? `option(${item.description + descriptionSuffix})`,
    fixedSize,
    maxSize: sumSerializerSizes.sumSerializerSizes([prefix.maxSize, item.maxSize]),
    serialize: optionOrNullable => {
      const option = umiOptions.isOption(optionOrNullable) ? optionOrNullable : umiOptions.wrapNullable(optionOrNullable);
      const prefixByte = prefix.serialize(Number(umiOptions.isSome(option)));
      if (fixed) {
        const itemFixedSize = item.fixedSize;
        const itemBytes = umiOptions.isSome(option) ? item.serialize(option.value).slice(0, itemFixedSize) : new Uint8Array(itemFixedSize).fill(0);
        return umiSerializersCore.mergeBytes([prefixByte, itemBytes]);
      }
      const itemBytes = umiOptions.isSome(option) ? item.serialize(option.value) : new Uint8Array();
      return umiSerializersCore.mergeBytes([prefixByte, itemBytes]);
    },
    deserialize: (bytes, offset = 0) => {
      if (bytes.slice(offset).length === 0) {
        return [umiOptions.none(), offset];
      }
      const fixedOffset = offset + (prefix.fixedSize ?? 0) + (item.fixedSize ?? 0);
      const [isSome, prefixOffset] = prefix.deserialize(bytes, offset);
      offset = prefixOffset;
      if (isSome === 0) {
        return [umiOptions.none(), fixed ? fixedOffset : offset];
      }
      const [value, newOffset] = item.deserialize(bytes, offset);
      offset = newOffset;
      return [umiOptions.some(value), fixed ? fixedOffset : offset];
    }
  };
}

exports.option = option;
//# sourceMappingURL=option.cjs.map
