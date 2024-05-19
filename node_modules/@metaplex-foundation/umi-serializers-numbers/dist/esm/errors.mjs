/** @category Errors */
class NumberOutOfRangeError extends RangeError {
  name = 'NumberOutOfRangeError';
  constructor(serializer, min, max, actual) {
    super(`Serializer [${serializer}] expected number to be between ${min} and ${max}, got ${actual}.`);
  }
}

export { NumberOutOfRangeError };
//# sourceMappingURL=errors.mjs.map
