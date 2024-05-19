import { DeserializingEmptyBufferError } from '@metaplex-foundation/umi-serializers-core';
import { u8 } from '@metaplex-foundation/umi-serializers-numbers';
import { EnumDiscriminatorOutOfRangeError, InvalidScalarEnumVariantError } from './errors.mjs';

/**
 * Defines a scalar enum as a type from its constructor.
 *
 * @example
 * ```ts
 * enum Direction { Left, Right };
 * type DirectionType = ScalarEnum<Direction>;
 * ```
 *
 * @category Serializers
 */

/**
 * Creates a scalar enum serializer.
 *
 * @param constructor - The constructor of the scalar enum.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function scalarEnum(constructor, options = {}) {
  const prefix = options.size ?? u8();
  const enumKeys = Object.keys(constructor);
  const enumValues = Object.values(constructor);
  const isNumericEnum = enumValues.some(v => typeof v === 'number');
  const valueDescriptions = enumValues.filter(v => typeof v === 'string').join(', ');
  const minRange = 0;
  const maxRange = isNumericEnum ? enumValues.length / 2 - 1 : enumValues.length - 1;
  const stringValues = isNumericEnum ? [...enumKeys] : [...new Set([...enumKeys, ...enumValues])];
  function assertValidVariant(variant) {
    const isInvalidNumber = typeof variant === 'number' && (variant < minRange || variant > maxRange);
    const isInvalidString = typeof variant === 'string' && !stringValues.includes(variant);
    if (isInvalidNumber || isInvalidString) {
      throw new InvalidScalarEnumVariantError(variant, stringValues, minRange, maxRange);
    }
  }
  return {
    description: options.description ?? `enum(${valueDescriptions}; ${prefix.description})`,
    fixedSize: prefix.fixedSize,
    maxSize: prefix.maxSize,
    serialize: value => {
      assertValidVariant(value);
      if (typeof value === 'number') return prefix.serialize(value);
      const valueIndex = enumValues.indexOf(value);
      if (valueIndex >= 0) return prefix.serialize(valueIndex);
      return prefix.serialize(enumKeys.indexOf(value));
    },
    deserialize: (bytes, offset = 0) => {
      if (bytes.slice(offset).length === 0) {
        throw new DeserializingEmptyBufferError('enum');
      }
      const [value, newOffset] = prefix.deserialize(bytes, offset);
      const valueAsNumber = Number(value);
      offset = newOffset;
      if (valueAsNumber < minRange || valueAsNumber > maxRange) {
        throw new EnumDiscriminatorOutOfRangeError(valueAsNumber, minRange, maxRange);
      }
      return [isNumericEnum ? valueAsNumber : enumValues[valueAsNumber], offset];
    }
  };
}

export { scalarEnum };
//# sourceMappingURL=scalarEnum.mjs.map
