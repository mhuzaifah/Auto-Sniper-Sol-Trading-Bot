import { InterfaceImplementationMissingError } from './errors/InterfaceImplementationMissingError.mjs';

/**
 * Defines the interface for a program repository.
 * It allows us to register and retrieve programs when needed.
 *
 * @category Context and Interfaces
 */

/**
 * An implementation of the {@link ProgramRepositoryInterface} that throws an error when called.
 * @category Programs
 */
function createNullProgramRepository() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError('ProgramRepositoryInterface', 'programs');
  };
  return {
    has: errorHandler,
    get: errorHandler,
    getPublicKey: errorHandler,
    all: errorHandler,
    add: errorHandler,
    bind: errorHandler,
    unbind: errorHandler,
    clone: errorHandler,
    resolveError: errorHandler
  };
}

export { createNullProgramRepository };
//# sourceMappingURL=ProgramRepositoryInterface.mjs.map
