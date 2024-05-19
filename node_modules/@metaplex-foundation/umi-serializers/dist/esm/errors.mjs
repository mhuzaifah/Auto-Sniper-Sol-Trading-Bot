/** @category Errors */
class InvalidNumberOfItemsError extends Error {
  name = 'InvalidNumberOfItemsError';
  constructor(serializer, expected, actual) {
    super(`Expected [${serializer}] to have ${expected} items, got ${actual}.`);
  }
}

/** @category Errors */
class InvalidArrayLikeRemainderSizeError extends Error {
  name = 'InvalidArrayLikeRemainderSizeError';
  constructor(remainderSize, itemSize) {
    super(`The remainder of the buffer (${remainderSize} bytes) cannot be split into chunks of ${itemSize} bytes. ` + `Serializers of "remainder" size must have a remainder that is a multiple of its item size. ` + `In other words, ${remainderSize} modulo ${itemSize} should be equal to zero.`);
  }
}

/** @category Errors */
class UnrecognizedArrayLikeSerializerSizeError extends Error {
  name = 'UnrecognizedArrayLikeSerializerSizeError';
  constructor(size) {
    super(`Unrecognized array-like serializer size: ${JSON.stringify(size)}`);
  }
}

/** @category Errors */
class InvalidDataEnumVariantError extends Error {
  name = 'InvalidDataEnumVariantError';
  constructor(invalidVariant, validVariants) {
    super(`Invalid data enum variant. ` + `Expected one of [${validVariants.join(', ')}], ` + `got "${invalidVariant}".`);
  }
}

/** @category Errors */
class InvalidScalarEnumVariantError extends Error {
  name = 'InvalidScalarEnumVariantError';
  constructor(invalidVariant, validVariants, min, max) {
    super(`Invalid scalar enum variant. ` + `Expected one of [${validVariants.join(', ')}] ` + `or a number between ${min} and ${max}, ` + `got "${invalidVariant}".`);
  }
}

/** @category Errors */
class EnumDiscriminatorOutOfRangeError extends RangeError {
  name = 'EnumDiscriminatorOutOfRangeError';
  constructor(discriminator, min, max) {
    super(`Enum discriminator out of range. ` + `Expected a number between ${min} and ${max}, got ${discriminator}.`);
  }
}

export { EnumDiscriminatorOutOfRangeError, InvalidArrayLikeRemainderSizeError, InvalidDataEnumVariantError, InvalidNumberOfItemsError, InvalidScalarEnumVariantError, UnrecognizedArrayLikeSerializerSizeError };
//# sourceMappingURL=errors.mjs.map
