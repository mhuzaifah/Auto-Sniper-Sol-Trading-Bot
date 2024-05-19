'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * An error that contains Program logs.
 * @category Programs
 */

/**
 * An error that contains a Program error code.
 * @category Programs
 */

/**
 * Whether the given value is an instance of {@link ErrorWithLogs}.
 * @category Programs
 */
const isErrorWithLogs = error => error instanceof Error && 'logs' in error;

/**
 * Defines a Solana Program that can be
 * registered in Umi's program repository.
 *
 * @category Programs
 */

exports.isErrorWithLogs = isErrorWithLogs;
//# sourceMappingURL=Program.cjs.map
