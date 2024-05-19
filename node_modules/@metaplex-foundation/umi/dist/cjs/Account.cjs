'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var UnexpectedAccountError = require('./errors/UnexpectedAccountError.cjs');
var AccountNotFoundError = require('./errors/AccountNotFoundError.cjs');

/**
 * The size of an account header in bytes.
 * @category Accounts
 */
const ACCOUNT_HEADER_SIZE = 128;

/**
 * Describes the header of an account.
 * @category Accounts
 */

/**
 * Given an account data serializer,
 * returns a deserialized account from a raw account.
 * @category Accounts
 */
function deserializeAccount(rawAccount, dataSerializer) {
  const {
    data,
    publicKey,
    ...rest
  } = rawAccount;
  try {
    const [parsedData] = dataSerializer.deserialize(data);
    return {
      publicKey,
      header: rest,
      ...parsedData
    };
  } catch (error) {
    throw new UnexpectedAccountError.UnexpectedAccountError(publicKey, dataSerializer.description, error);
  }
}

/**
 * Ensures an account that may or may not exist actually exists.
 * @category Accounts
 */
function assertAccountExists(account, name, solution) {
  if (!account.exists) {
    throw new AccountNotFoundError.AccountNotFoundError(account.publicKey, name, solution);
  }
}

exports.ACCOUNT_HEADER_SIZE = ACCOUNT_HEADER_SIZE;
exports.assertAccountExists = assertAccountExists;
exports.deserializeAccount = deserializeAccount;
//# sourceMappingURL=Account.cjs.map
