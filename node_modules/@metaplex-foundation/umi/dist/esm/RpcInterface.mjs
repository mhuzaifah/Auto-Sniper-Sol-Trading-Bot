import { InterfaceImplementationMissingError } from './errors/InterfaceImplementationMissingError.mjs';

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
    throw new InterfaceImplementationMissingError('RpcInterface', 'rpc');
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

export { createNullRpc };
//# sourceMappingURL=RpcInterface.mjs.map
