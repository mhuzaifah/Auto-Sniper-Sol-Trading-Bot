/** @category Errors */
export declare class InvalidBaseStringError extends Error {
    readonly name: string;
    readonly cause?: Error;
    constructor(value: string, base: number, cause?: Error);
}
