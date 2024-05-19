/** @category Errors */
export declare class NumberOutOfRangeError extends RangeError {
    readonly name: string;
    constructor(serializer: string, min: number | bigint, max: number | bigint, actual: number | bigint);
}
