import { InterfaceImplementationMissingError } from './errors/InterfaceImplementationMissingError.mjs';

/**
 * An implementation of the {@link TransactionFactoryInterface} that throws an error when called.
 * @category Transactions
 */
function createNullTransactionFactory() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError('TransactionFactoryInterface', 'transactions');
  };
  return {
    create: errorHandler,
    serialize: errorHandler,
    deserialize: errorHandler,
    serializeMessage: errorHandler,
    deserializeMessage: errorHandler
  };
}

export { createNullTransactionFactory };
//# sourceMappingURL=TransactionFactoryInterface.mjs.map
