import { UmiError } from './UmiError.mjs';

/** @category Errors */

/** @category Errors */
class ProgramError extends UmiError {
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

export { ProgramError };
//# sourceMappingURL=ProgramError.mjs.map
