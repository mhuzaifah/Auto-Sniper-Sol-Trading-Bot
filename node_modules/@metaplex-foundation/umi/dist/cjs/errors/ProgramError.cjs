'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var UmiError = require('./UmiError.cjs');

/** @category Errors */

/** @category Errors */
class ProgramError extends UmiError.UmiError {
  name = 'ProgramError';
  constructor(message, program, cause) {
    super(message, 'program', `${program.name} [${program.publicKey}]`, cause);
    this.program = program;
    this.logs = cause?.logs;
    if (this.logs) {
      this.message += `\nProgram Logs:\n${this.logs.map(log => `| ${log}`).join('\n')}\n`;
    }
  }
}

exports.ProgramError = ProgramError;
//# sourceMappingURL=ProgramError.cjs.map
