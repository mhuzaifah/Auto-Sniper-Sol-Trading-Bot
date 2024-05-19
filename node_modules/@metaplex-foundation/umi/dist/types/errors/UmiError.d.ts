/** @category Errors */
export declare class UmiError extends Error {
    readonly name: string;
    readonly source: UmiErrorSource;
    readonly sourceDetails?: string;
    readonly cause?: Error;
    constructor(message: string, source: UmiErrorSource, sourceDetails?: string, cause?: Error);
    getCapitalizedSource(): string;
    getFullSource(): string;
    toString(): string;
}
/** @category Errors */
export type UmiErrorSource = 'sdk' | 'network' | 'rpc' | 'plugin' | 'program';
