import { SdkError } from './SdkError';
/** @category Errors */
export declare class InvalidBaseStringError extends SdkError {
    readonly name: string;
    constructor(value: string, base: number, cause?: Error);
}
