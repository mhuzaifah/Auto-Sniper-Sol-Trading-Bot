'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SdkError = require('./SdkError.cjs');

/** @category Errors */
class UnexpectedAmountError extends SdkError.SdkError {
  name = 'UnexpectedAmountError';
  constructor(amount, expectedIdentifier, expectedDecimals) {
    const message = `Expected amount of type [${expectedIdentifier} with ${expectedDecimals} decimals] ` + `but got [${amount.identifier} with ${amount.decimals} decimals]. ` + `Ensure the provided Amount is of the expected type.`;
    super(message);
    this.amount = amount;
    this.expectedIdentifier = expectedIdentifier;
    this.expectedDecimals = expectedDecimals;
  }
}

exports.UnexpectedAmountError = UnexpectedAmountError;
//# sourceMappingURL=UnexpectedAmountError.cjs.map
