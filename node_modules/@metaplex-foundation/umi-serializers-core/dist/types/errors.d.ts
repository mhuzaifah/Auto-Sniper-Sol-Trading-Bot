/** @category Errors */
export declare class DeserializingEmptyBufferError extends Error {
    readonly name: string;
    constructor(serializer: string);
}
/** @category Errors */
export declare class NotEnoughBytesError extends Error {
    readonly name: string;
    constructor(serializer: string, expected: bigint | number, actual: bigint | number);
}
/** @category Errors */
export declare class ExpectedFixedSizeSerializerError extends Error {
    readonly name: string;
    constructor(message?: string);
}
