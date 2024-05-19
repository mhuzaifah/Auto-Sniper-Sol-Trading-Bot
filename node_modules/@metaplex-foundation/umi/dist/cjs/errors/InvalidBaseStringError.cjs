'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SdkError = require('./SdkError.cjs');

/** @category Errors */
class InvalidBaseStringError extends SdkError.SdkError {
  name = 'InvalidBaseStringError';
  constructor(value, base, cause) {
    const message = `Expected a string of base ${base}, got [${value}].`;
    super(message, cause);
  }
}

exports.InvalidBaseStringError = InvalidBaseStringError;
//# sourceMappingURL=InvalidBaseStringError.cjs.map
