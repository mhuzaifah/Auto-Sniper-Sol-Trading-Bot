import { InterfaceImplementationMissingError } from './errors/InterfaceImplementationMissingError.mjs';

/**
 * An implementation of the {@link EddsaInterface} that throws an error when called.
 * @category Signers and PublicKeys
 */
function createNullEddsa() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError('EddsaInterface', 'eddsa');
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

export { createNullEddsa };
//# sourceMappingURL=EddsaInterface.mjs.map
