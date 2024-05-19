'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SdkError = require('./SdkError.cjs');

/** @category Errors */
class UnexpectedAccountError extends SdkError.SdkError {
  name = 'UnexpectedAccountError';
  constructor(publicKey, expectedType, cause) {
    const message = `The account at the provided address [${publicKey}] ` + `is not of the expected type [${expectedType}].`;
    super(message, cause);
  }
}

exports.UnexpectedAccountError = UnexpectedAccountError;
//# sourceMappingURL=UnexpectedAccountError.cjs.map
