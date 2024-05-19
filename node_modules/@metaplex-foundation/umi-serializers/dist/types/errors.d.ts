/** @category Errors */
export declare class InvalidNumberOfItemsError extends Error {
    readonly name = "InvalidNumberOfItemsError";
    constructor(serializer: string, expected: number | bigint, actual: number | bigint);
}
/** @category Errors */
export declare class InvalidArrayLikeRemainderSizeError extends Error {
    readonly name = "InvalidArrayLikeRemainderSizeError";
    constructor(remainderSize: number | bigint, itemSize: number | bigint);
}
/** @category Errors */
export declare class UnrecognizedArrayLikeSerializerSizeError extends Error {
    readonly name = "UnrecognizedArrayLikeSerializerSizeError";
    constructor(size: never);
}
/** @category Errors */
export declare class InvalidDataEnumVariantError extends Error {
    readonly name = "InvalidDataEnumVariantError";
    constructor(invalidVariant: string, validVariants: string[]);
}
/** @category Errors */
export declare class InvalidScalarEnumVariantError extends Error {
    readonly name = "InvalidScalarEnumVariantError";
    constructor(invalidVariant: string | number | bigint, validVariants: string[], min: number | bigint, max: number | bigint);
}
/** @category Errors */
export declare class EnumDiscriminatorOutOfRangeError extends RangeError {
    readonly name = "EnumDiscriminatorOutOfRangeError";
    constructor(discriminator: number | bigint, min: number | bigint, max: number | bigint);
}
