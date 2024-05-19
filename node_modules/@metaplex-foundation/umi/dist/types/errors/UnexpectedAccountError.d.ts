import { PublicKey } from '@metaplex-foundation/umi-public-keys';
import { SdkError } from './SdkError';
/** @category Errors */
export declare class UnexpectedAccountError extends SdkError {
    readonly name: string;
    constructor(publicKey: PublicKey, expectedType: string, cause?: Error);
}
