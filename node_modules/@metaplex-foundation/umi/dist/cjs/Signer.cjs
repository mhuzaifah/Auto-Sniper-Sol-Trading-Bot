'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arrays = require('./utils/arrays.cjs');

/**
 * Defines a public key that can sign transactions and messages.
 * @category Context and Interfaces
 */

/**
 * Signs a transaction using the provided signers.
 * @category Signers and PublicKeys
 */
const signTransaction = async (transaction, signers) => signers.reduce(async (promise, signer) => {
  const unsigned = await promise;
  return signer.signTransaction(unsigned);
}, Promise.resolve(transaction));

/**
 * Signs multiple transactions using the provided signers
 * such that signers that need to sign multiple transactions
 * sign them all at once using the `signAllTransactions` method.
 *
 * @category Signers and PublicKeys
 */
const signAllTransactions = async transactionsWithSigners => {
  const transactions = transactionsWithSigners.map(item => item.transaction);
  const signersWithTransactions = transactionsWithSigners.reduce((all, {
    signers
  }, index) => {
    signers.forEach(signer => {
      const item = all.find(item => item.signer.publicKey === signer.publicKey);
      if (item) {
        item.indices.push(index);
      } else {
        all.push({
          signer,
          indices: [index]
        });
      }
    });
    return all;
  }, []);
  return signersWithTransactions.reduce(async (promise, {
    signer,
    indices
  }) => {
    const transactions = await promise;
    if (indices.length === 1) {
      const unsigned = transactions[indices[0]];
      transactions[indices[0]] = await signer.signTransaction(unsigned);
      return transactions;
    }
    const unsigned = indices.map(index => transactions[index]);
    const signed = await signer.signAllTransactions(unsigned);
    indices.forEach((index, position) => {
      transactions[index] = signed[position];
    });
    return transactions;
  }, Promise.resolve(transactions));
};

/**
 * Whether the provided value is a `Signer`.
 * @category Signers and PublicKeys
 */
const isSigner = value => typeof value === 'object' && 'publicKey' in value && 'signMessage' in value;

/**
 * Deduplicates the provided signers by public key.
 * @category Signers and PublicKeys
 */
const uniqueSigners = signers => arrays.uniqueBy(signers, (a, b) => a.publicKey === b.publicKey);

/**
 * Creates a `Signer` that, when required to sign, does nothing.
 * This can be useful when libraries require a `Signer` but
 * we don't have one in the current environment. For example,
 * if the transaction will then be signed in a backend server.
 *
 * @category Signers and PublicKeys
 */
const createNoopSigner = publicKey => ({
  publicKey,
  async signMessage(message) {
    return message;
  },
  async signTransaction(transaction) {
    return transaction;
  },
  async signAllTransactions(transactions) {
    return transactions;
  }
});

/**
 * Creates a `Signer` that, when required to sign, throws an error.
 * @category Signers and PublicKeys
 */
function createNullSigner() {
  const error = new Error('Trying to use a NullSigner. ' + 'Did you forget to set a Signer on your Umi instance? ' + 'See the `signerIdentity` method for more information.');
  const errorHandler = () => {
    throw error;
  };
  return {
    get publicKey() {
      throw error;
    },
    signMessage: errorHandler,
    signTransaction: errorHandler,
    signAllTransactions: errorHandler
  };
}

exports.createNoopSigner = createNoopSigner;
exports.createNullSigner = createNullSigner;
exports.isSigner = isSigner;
exports.signAllTransactions = signAllTransactions;
exports.signTransaction = signTransaction;
exports.uniqueSigners = uniqueSigners;
//# sourceMappingURL=Signer.cjs.map
