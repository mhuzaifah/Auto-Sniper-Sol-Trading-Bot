import type { Amount, AmountDecimals, AmountIdentifier } from '../Amount';
import { SdkError } from './SdkError';
/** @category Errors */
export declare class UnexpectedAmountError extends SdkError {
    readonly name: string;
    readonly amount: Amount;
    readonly expectedIdentifier: AmountIdentifier;
    readonly expectedDecimals: AmountDecimals;
    constructor(amount: Amount, expectedIdentifier: AmountIdentifier, expectedDecimals: AmountDecimals);
}
