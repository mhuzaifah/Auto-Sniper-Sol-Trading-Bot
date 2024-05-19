'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SdkError = require('./SdkError.cjs');

/** @category Errors */
class AmountMismatchError extends SdkError.SdkError {
  name = 'AmountMismatchError';
  constructor(left, right, operation) {
    const wrappedOperation = operation ? ` [${operation}]` : '';
    const message = `The SDK tried to execute an operation${wrappedOperation} on two amounts of different types: ` + `[${left.identifier} with ${left.decimals} decimals] and ` + `[${right.identifier} with ${right.decimals} decimals]. ` + `Provide both amounts in the same type to perform this operation.`;
    super(message);
    this.left = left;
    this.right = right;
    this.operation = operation;
  }
}

exports.AmountMismatchError = AmountMismatchError;
//# sourceMappingURL=AmountMismatchError.cjs.map
