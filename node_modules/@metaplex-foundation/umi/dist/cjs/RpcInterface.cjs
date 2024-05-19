'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InterfaceImplementationMissingError = require('./errors/InterfaceImplementationMissingError.cjs');

/**
 * Defines the interface for an RPC client.
 * It allows us to interact with the Solana blockchain.
 *
 * @category Context and Interfaces
 */

/**
 * An implementation of the {@link RpcInterface} that throws an error when called.
 * @category Rpc
 */
function createNullRpc() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError.InterfaceImplementationMissingError('RpcInterface', 'rpc');
  };
  return {
    getEndpoint: errorHandler,
    getCluster: errorHandler,
    getAccount: errorHandler,
    getAccounts: errorHandler,
    getProgramAccounts: errorHandler,
    getBlockTime: errorHandler,
    getBalance: errorHandler,
    getRent: errorHandler,
    getSlot: errorHandler,
    getLatestBlockhash: errorHandler,
    getTransaction: errorHandler,
    getSignatureStatuses: errorHandler,
    accountExists: errorHandler,
    airdrop: errorHandler,
    call: errorHandler,
    sendTransaction: errorHandler,
    confirmTransaction: errorHandler
  };
}

exports.createNullRpc = createNullRpc;
//# sourceMappingURL=RpcInterface.cjs.map
