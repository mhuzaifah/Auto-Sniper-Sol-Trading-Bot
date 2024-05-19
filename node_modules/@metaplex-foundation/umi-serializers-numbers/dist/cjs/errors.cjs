'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/** @category Errors */
class NumberOutOfRangeError extends RangeError {
  name = 'NumberOutOfRangeError';
  constructor(serializer, min, max, actual) {
    super(`Serializer [${serializer}] expected number to be between ${min} and ${max}, got ${actual}.`);
  }
}

exports.NumberOutOfRangeError = NumberOutOfRangeError;
//# sourceMappingURL=errors.cjs.map
