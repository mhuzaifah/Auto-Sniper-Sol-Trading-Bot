/** @category Errors */
export declare class InvalidPublicKeyError extends Error {
    readonly name: string;
    readonly invalidPublicKey: string;
    constructor(invalidPublicKey: string, reason?: string);
}
