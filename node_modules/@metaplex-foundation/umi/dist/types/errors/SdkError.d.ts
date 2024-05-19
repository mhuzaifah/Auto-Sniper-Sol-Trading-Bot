import { UmiError } from './UmiError';
/** @category Errors */
export declare class SdkError extends UmiError {
    readonly name: string;
    constructor(message: string, cause?: Error);
}
