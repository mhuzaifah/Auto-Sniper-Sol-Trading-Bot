import { UmiError } from './UmiError.mjs';

/** @category Errors */
class SdkError extends UmiError {
  name = 'SdkError';
  constructor(message, cause) {
    super(message, 'sdk', undefined, cause);
  }
}

export { SdkError };
//# sourceMappingURL=SdkError.mjs.map
