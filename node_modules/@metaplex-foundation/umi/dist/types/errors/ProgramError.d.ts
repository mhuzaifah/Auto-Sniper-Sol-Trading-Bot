import type { Program } from '../Program';
import { UmiError } from './UmiError';
/** @category Errors */
export type UnderlyingProgramError = Error & {
    code?: number;
    logs?: string[];
};
/** @category Errors */
export declare class ProgramError extends UmiError {
    readonly name: string;
    readonly program: Program;
    readonly logs?: string[];
    constructor(message: string, program: Program, cause?: UnderlyingProgramError);
}
