'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SdkError = require('./SdkError.cjs');

/** @category Errors */
class InterfaceImplementationMissingError extends SdkError.SdkError {
  name = 'InterfaceImplementationMissingError';
  constructor(interfaceName, contextVariable) {
    const interfaceBasename = interfaceName.replace(/Interface$/, '');
    const message = `Tried using ${interfaceName} but no implementation of that interface was found. ` + `Make sure an implementation is registered, ` + `e.g. via "context.${contextVariable} = new My${interfaceBasename}();".`;
    super(message);
  }
}

exports.InterfaceImplementationMissingError = InterfaceImplementationMissingError;
//# sourceMappingURL=InterfaceImplementationMissingError.cjs.map
