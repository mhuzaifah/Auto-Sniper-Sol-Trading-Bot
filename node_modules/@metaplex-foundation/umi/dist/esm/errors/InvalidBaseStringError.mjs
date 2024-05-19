import { SdkError } from './SdkError.mjs';

/** @category Errors */
class InvalidBaseStringError extends SdkError {
  name = 'InvalidBaseStringError';
  constructor(value, base, cause) {
    const message = `Expected a string of base ${base}, got [${value}].`;
    super(message, cause);
  }
}

export { InvalidBaseStringError };
//# sourceMappingURL=InvalidBaseStringError.mjs.map
