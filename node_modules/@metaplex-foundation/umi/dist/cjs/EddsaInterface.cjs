'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InterfaceImplementationMissingError = require('./errors/InterfaceImplementationMissingError.cjs');

/**
 * An implementation of the {@link EddsaInterface} that throws an error when called.
 * @category Signers and PublicKeys
 */
function createNullEddsa() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError.InterfaceImplementationMissingError('EddsaInterface', 'eddsa');
  };
  return {
    generateKeypair: errorHandler,
    createKeypairFromSecretKey: errorHandler,
    createKeypairFromSeed: errorHandler,
    isOnCurve: errorHandler,
    findPda: errorHandler,
    sign: errorHandler,
    verify: errorHandler
  };
}

exports.createNullEddsa = createNullEddsa;
//# sourceMappingURL=EddsaInterface.cjs.map
