'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Keypair = require('./Keypair.cjs');

/**
 * Umi plugin that sets the identity and the payer to the given signer.
 * @category Signers and PublicKeys
 */
const signerIdentity = (signer, setPayer = true) => ({
  install(umi) {
    umi.identity = signer;
    if (setPayer) {
      umi.payer = signer;
    }
  }
});

/**
 * Umi plugin that only sets the payer to the given signer.
 * @category Signers and PublicKeys
 */
const signerPayer = signer => ({
  install(umi) {
    umi.payer = signer;
  }
});

/**
 * Umi plugin that sets the identity and the payer to a randomly generated signer.
 * @category Signers and PublicKeys
 */
const generatedSignerIdentity = (setPayer = true) => ({
  install(umi) {
    const signer = Keypair.generateSigner(umi);
    umi.use(signerIdentity(signer, setPayer));
  }
});

/**
 * Umi plugin that only sets the payer to a randomly generated signer.
 * @category Signers and PublicKeys
 */
const generatedSignerPayer = () => ({
  install(umi) {
    const signer = Keypair.generateSigner(umi);
    umi.use(signerPayer(signer));
  }
});

/**
 * Umi plugin that sets the identity and the payer to a provided keypair.
 * @category Signers and PublicKeys
 */
const keypairIdentity = (keypair, setPayer = true) => ({
  install(umi) {
    const signer = Keypair.createSignerFromKeypair(umi, keypair);
    umi.use(signerIdentity(signer, setPayer));
  }
});

/**
 * Umi plugin that only sets the payer to a provided keypair.
 * @category Signers and PublicKeys
 */
const keypairPayer = keypair => ({
  install(umi) {
    const signer = Keypair.createSignerFromKeypair(umi, keypair);
    umi.use(signerPayer(signer));
  }
});

exports.generatedSignerIdentity = generatedSignerIdentity;
exports.generatedSignerPayer = generatedSignerPayer;
exports.keypairIdentity = keypairIdentity;
exports.keypairPayer = keypairPayer;
exports.signerIdentity = signerIdentity;
exports.signerPayer = signerPayer;
//# sourceMappingURL=SignerPlugins.cjs.map
