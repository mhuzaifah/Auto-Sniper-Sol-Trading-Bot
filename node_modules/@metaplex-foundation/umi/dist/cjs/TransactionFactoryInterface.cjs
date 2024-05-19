'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InterfaceImplementationMissingError = require('./errors/InterfaceImplementationMissingError.cjs');

/**
 * An implementation of the {@link TransactionFactoryInterface} that throws an error when called.
 * @category Transactions
 */
function createNullTransactionFactory() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError.InterfaceImplementationMissingError('TransactionFactoryInterface', 'transactions');
  };
  return {
    create: errorHandler,
    serialize: errorHandler,
    deserialize: errorHandler,
    serializeMessage: errorHandler,
    deserializeMessage: errorHandler
  };
}

exports.createNullTransactionFactory = createNullTransactionFactory;
//# sourceMappingURL=TransactionFactoryInterface.cjs.map
