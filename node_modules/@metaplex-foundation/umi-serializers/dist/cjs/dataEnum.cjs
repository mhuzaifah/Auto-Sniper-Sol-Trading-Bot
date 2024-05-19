'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var umiSerializersNumbers = require('@metaplex-foundation/umi-serializers-numbers');
var errors = require('./errors.cjs');
var maxSerializerSizes = require('./maxSerializerSizes.cjs');
var sumSerializerSizes = require('./sumSerializerSizes.cjs');

/**
 * Defines a data enum using discriminated union types.
 *
 * @example
 * ```ts
 * type WebPageEvent =
 *   | { __kind: 'pageview', url: string }
 *   | { __kind: 'click', x: number, y: number };
 * ```
 *
 * @category Serializers
 */

/**
 * Creates a data enum serializer.
 *
 * @param variants - The variant serializers of the data enum.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function dataEnum(variants, options = {}) {
  const prefix = options.size ?? umiSerializersNumbers.u8();
  const fieldDescriptions = variants.map(([name, serializer]) => `${String(name)}${serializer ? `: ${serializer.description}` : ''}`).join(', ');
  const allVariantHaveTheSameFixedSize = variants.every((one, i, all) => one[1].fixedSize === all[0][1].fixedSize);
  const fixedVariantSize = allVariantHaveTheSameFixedSize ? variants[0][1].fixedSize : null;
  const maxVariantSize = maxSerializerSizes.maxSerializerSizes(variants.map(([, field]) => field.maxSize));
  return {
    description: options.description ?? `dataEnum(${fieldDescriptions}; ${prefix.description})`,
    fixedSize: variants.length === 0 ? prefix.fixedSize : sumSerializerSizes.sumSerializerSizes([prefix.fixedSize, fixedVariantSize]),
    maxSize: variants.length === 0 ? prefix.maxSize : sumSerializerSizes.sumSerializerSizes([prefix.maxSize, maxVariantSize]),
    serialize: variant => {
      const discriminator = variants.findIndex(([key]) => variant.__kind === key);
      if (discriminator < 0) {
        throw new errors.InvalidDataEnumVariantError(variant.__kind, variants.map(([key]) => key));
      }
      const variantPrefix = prefix.serialize(discriminator);
      const variantSerializer = variants[discriminator][1];
      const variantBytes = variantSerializer.serialize(variant);
      return umiSerializersCore.mergeBytes([variantPrefix, variantBytes]);
    },
    deserialize: (bytes, offset = 0) => {
      if (bytes.slice(offset).length === 0) {
        throw new umiSerializersCore.DeserializingEmptyBufferError('dataEnum');
      }
      const [discriminator, dOffset] = prefix.deserialize(bytes, offset);
      offset = dOffset;
      const variantField = variants[Number(discriminator)] ?? null;
      if (!variantField) {
        throw new errors.EnumDiscriminatorOutOfRangeError(discriminator, 0, variants.length - 1);
      }
      const [variant, vOffset] = variantField[1].deserialize(bytes, offset);
      offset = vOffset;
      return [{
        __kind: variantField[0],
        ...(variant ?? {})
      }, offset];
    }
  };
}

exports.dataEnum = dataEnum;
//# sourceMappingURL=dataEnum.cjs.map
