'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * The maximum amount of bytes that can be used for a transaction.
 * @category Transactions
 */
const TRANSACTION_SIZE_LIMIT = 1232;

/**
 * The version of a transaction.
 * - Legacy is the very first iteration of Solana transactions.
 * - V0 introduces the concept of versionned transaction for
 * the first time and adds supports for address lookup tables.
 *
 * @category Transactions
 */

/**
 * Adds a given signature to the transaction's signature array
 * and returns the updated transaction as a new object.
 *
 * @category Transactions
 */
const addTransactionSignature = (transaction, signature, signerPublicKey) => {
  const maxSigners = transaction.message.header.numRequiredSignatures;
  const signerPublicKeys = transaction.message.accounts.slice(0, maxSigners);
  const signerIndex = signerPublicKeys.findIndex(key => key === signerPublicKey);
  if (signerIndex < 0) {
    throw new Error('The provided signer is not required to sign this transaction.');
  }
  const newSignatures = [...transaction.signatures];
  newSignatures[signerIndex] = signature;
  return {
    ...transaction,
    signatures: newSignatures
  };
};

exports.TRANSACTION_SIZE_LIMIT = TRANSACTION_SIZE_LIMIT;
exports.addTransactionSignature = addTransactionSignature;
//# sourceMappingURL=Transaction.cjs.map
