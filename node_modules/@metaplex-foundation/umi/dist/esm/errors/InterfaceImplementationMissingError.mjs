import { SdkError } from './SdkError.mjs';

/** @category Errors */
class InterfaceImplementationMissingError extends SdkError {
  name = 'InterfaceImplementationMissingError';
  constructor(interfaceName, contextVariable) {
    const interfaceBasename = interfaceName.replace(/Interface$/, '');
    const message = `Tried using ${interfaceName} but no implementation of that interface was found. ` + `Make sure an implementation is registered, ` + `e.g. via "context.${contextVariable} = new My${interfaceBasename}();".`;
    super(message);
  }
}

export { InterfaceImplementationMissingError };
//# sourceMappingURL=InterfaceImplementationMissingError.mjs.map
