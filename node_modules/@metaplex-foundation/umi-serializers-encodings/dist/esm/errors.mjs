/** @category Errors */
class InvalidBaseStringError extends Error {
  name = 'InvalidBaseStringError';
  constructor(value, base, cause) {
    const message = `Expected a string of base ${base}, got [${value}].`;
    super(message);
    this.cause = cause;
  }
}

export { InvalidBaseStringError };
//# sourceMappingURL=errors.mjs.map
