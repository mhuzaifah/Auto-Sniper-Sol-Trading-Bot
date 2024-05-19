import { SdkError } from './SdkError';
/** @category Errors */
export declare class InterfaceImplementationMissingError extends SdkError {
    readonly name: string;
    constructor(interfaceName: string, contextVariable: string);
}
