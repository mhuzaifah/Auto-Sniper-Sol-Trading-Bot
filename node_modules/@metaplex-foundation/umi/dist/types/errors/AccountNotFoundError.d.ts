import { PublicKey } from '@metaplex-foundation/umi-public-keys';
import { SdkError } from './SdkError';
/** @category Errors */
export declare class AccountNotFoundError extends SdkError {
    readonly name: string;
    constructor(publicKey: PublicKey, accountType?: string, solution?: string);
}
