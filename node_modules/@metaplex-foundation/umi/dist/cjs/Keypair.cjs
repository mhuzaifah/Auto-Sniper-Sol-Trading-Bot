'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Transaction = require('./Transaction.cjs');

/**
 * Represents a keypair with a public key and a secret key.
 * @category Signers and PublicKeys
 */

/**
 * Generate a new random {@link KeypairSigner} using the Eddsa interface.
 * @category Signers and PublicKeys
 */
const generateSigner = context => createSignerFromKeypair(context, context.eddsa.generateKeypair());

/**
 * Creates a {@link KeypairSigner} from a {@link Keypair} object.
 * @category Signers and PublicKeys
 */
const createSignerFromKeypair = (context, keypair) => ({
  publicKey: keypair.publicKey,
  secretKey: keypair.secretKey,
  async signMessage(message) {
    return context.eddsa.sign(message, keypair);
  },
  async signTransaction(transaction) {
    const message = transaction.serializedMessage;
    const signature = context.eddsa.sign(message, keypair);
    return Transaction.addTransactionSignature(transaction, signature, keypair.publicKey);
  },
  async signAllTransactions(transactions) {
    return Promise.all(transactions.map(transaction => this.signTransaction(transaction)));
  }
});

/**
 * Whether the given signer is a {@link KeypairSigner}.
 * @category Signers and PublicKeys
 */
const isKeypairSigner = signer => signer.secretKey !== undefined;

exports.createSignerFromKeypair = createSignerFromKeypair;
exports.generateSigner = generateSigner;
exports.isKeypairSigner = isKeypairSigner;
//# sourceMappingURL=Keypair.cjs.map
