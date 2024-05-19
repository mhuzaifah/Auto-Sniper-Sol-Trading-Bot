/**
 * Chunks an array into smaller arrays of (at most) the specified size.
 * @category Utils
 */
export declare const chunk: <T>(array: T[], chunkSize: number) => T[][];
/**
 * Zips two arrays together, using the provided function to map the values.
 * @category Utils
 */
export declare const zipMap: <T, U, V>(left: T[], right: U[], fn: (t: T, u: U | null, i: number) => V) => V[];
/**
 * Deduplicates an array by the provided function.
 * @category Utils
 */
export declare const uniqueBy: <T>(array: T[], fn: (a: T, b: T) => boolean) => T[];
