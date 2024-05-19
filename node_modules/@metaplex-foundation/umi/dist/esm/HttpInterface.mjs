import { InterfaceImplementationMissingError } from './errors/InterfaceImplementationMissingError.mjs';

/**
 * An implementation of the {@link HttpInterface} that throws an error when called.
 * @category Http
 */
function createNullHttp() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError('HttpInterface', 'http');
  };
  return {
    send: errorHandler
  };
}

export { createNullHttp };
//# sourceMappingURL=HttpInterface.mjs.map
