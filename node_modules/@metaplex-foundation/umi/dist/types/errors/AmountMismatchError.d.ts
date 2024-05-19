import type { Amount } from '../Amount';
import { SdkError } from './SdkError';
/** @category Errors */
export declare class AmountMismatchError extends SdkError {
    readonly name: string;
    readonly left: Amount;
    readonly right: Amount;
    readonly operation?: string;
    constructor(left: Amount, right: Amount, operation?: string);
}
