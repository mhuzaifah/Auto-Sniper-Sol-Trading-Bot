/**
 * Concatenates an array of `Uint8Array`s into a single `Uint8Array`.
 * @category Utils
 */
export declare const mergeBytes: (bytesArr: Uint8Array[]) => Uint8Array;
/**
 * Pads a `Uint8Array` with zeroes to the specified length.
 * If the array is longer than the specified length, it is returned as-is.
 * @category Utils
 */
export declare const padBytes: (bytes: Uint8Array, length: number) => Uint8Array;
/**
 * Fixes a `Uint8Array` to the specified length.
 * If the array is longer than the specified length, it is truncated.
 * If the array is shorter than the specified length, it is padded with zeroes.
 * @category Utils
 */
export declare const fixBytes: (bytes: Uint8Array, length: number) => Uint8Array;
