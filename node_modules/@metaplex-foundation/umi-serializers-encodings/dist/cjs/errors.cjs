'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/** @category Errors */
class InvalidBaseStringError extends Error {
  name = 'InvalidBaseStringError';
  constructor(value, base, cause) {
    const message = `Expected a string of base ${base}, got [${value}].`;
    super(message);
    this.cause = cause;
  }
}

exports.InvalidBaseStringError = InvalidBaseStringError;
//# sourceMappingURL=errors.cjs.map
