import { mergeBytes, DeserializingEmptyBufferError } from '@metaplex-foundation/umi-serializers-core';
import { u8 } from '@metaplex-foundation/umi-serializers-numbers';
import { InvalidDataEnumVariantError, EnumDiscriminatorOutOfRangeError } from './errors.mjs';
import { maxSerializerSizes } from './maxSerializerSizes.mjs';
import { sumSerializerSizes } from './sumSerializerSizes.mjs';

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
  const prefix = options.size ?? u8();
  const fieldDescriptions = variants.map(([name, serializer]) => `${String(name)}${serializer ? `: ${serializer.description}` : ''}`).join(', ');
  const allVariantHaveTheSameFixedSize = variants.every((one, i, all) => one[1].fixedSize === all[0][1].fixedSize);
  const fixedVariantSize = allVariantHaveTheSameFixedSize ? variants[0][1].fixedSize : null;
  const maxVariantSize = maxSerializerSizes(variants.map(([, field]) => field.maxSize));
  return {
    description: options.description ?? `dataEnum(${fieldDescriptions}; ${prefix.description})`,
    fixedSize: variants.length === 0 ? prefix.fixedSize : sumSerializerSizes([prefix.fixedSize, fixedVariantSize]),
    maxSize: variants.length === 0 ? prefix.maxSize : sumSerializerSizes([prefix.maxSize, maxVariantSize]),
    serialize: variant => {
      const discriminator = variants.findIndex(([key]) => variant.__kind === key);
      if (discriminator < 0) {
        throw new InvalidDataEnumVariantError(variant.__kind, variants.map(([key]) => key));
      }
      const variantPrefix = prefix.serialize(discriminator);
      const variantSerializer = variants[discriminator][1];
      const variantBytes = variantSerializer.serialize(variant);
      return mergeBytes([variantPrefix, variantBytes]);
    },
    deserialize: (bytes, offset = 0) => {
      if (bytes.slice(offset).length === 0) {
        throw new DeserializingEmptyBufferError('dataEnum');
      }
      const [discriminator, dOffset] = prefix.deserialize(bytes, offset);
      offset = dOffset;
      const variantField = variants[Number(discriminator)] ?? null;
      if (!variantField) {
        throw new EnumDiscriminatorOutOfRangeError(discriminator, 0, variants.length - 1);
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

export { dataEnum };
//# sourceMappingURL=dataEnum.mjs.map
