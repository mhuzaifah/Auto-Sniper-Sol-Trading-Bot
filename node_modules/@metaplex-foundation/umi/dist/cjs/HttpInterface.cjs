'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InterfaceImplementationMissingError = require('./errors/InterfaceImplementationMissingError.cjs');

/**
 * An implementation of the {@link HttpInterface} that throws an error when called.
 * @category Http
 */
function createNullHttp() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError.InterfaceImplementationMissingError('HttpInterface', 'http');
  };
  return {
    send: errorHandler
  };
}

exports.createNullHttp = createNullHttp;
//# sourceMappingURL=HttpInterface.cjs.map
