'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SdkError = require('./SdkError.cjs');

/** @category Errors */
class AccountNotFoundError extends SdkError.SdkError {
  name = 'AccountNotFoundError';
  constructor(publicKey, accountType, solution) {
    const message = `${accountType ? `The account of type [${accountType}] was not found` : 'No account was found'} at the provided address [${publicKey}].${solution ? ` ${solution}` : ''}`;
    super(message);
  }
}

exports.AccountNotFoundError = AccountNotFoundError;
//# sourceMappingURL=AccountNotFoundError.cjs.map
