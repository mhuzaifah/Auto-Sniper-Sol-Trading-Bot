'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var UmiError = require('./UmiError.cjs');

/** @category Errors */
class SdkError extends UmiError.UmiError {
  name = 'SdkError';
  constructor(message, cause) {
    super(message, 'sdk', undefined, cause);
  }
}

exports.SdkError = SdkError;
//# sourceMappingURL=SdkError.cjs.map
