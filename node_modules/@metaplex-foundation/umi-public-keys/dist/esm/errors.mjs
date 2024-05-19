/** @category Errors */
class InvalidPublicKeyError extends Error {
  name = 'InvalidPublicKeyError';
  constructor(invalidPublicKey, reason) {
    reason = reason ? `. ${reason}` : '';
    super(`The provided public key is invalid: ${invalidPublicKey}${reason}`);
    this.invalidPublicKey = invalidPublicKey;
  }
}

export { InvalidPublicKeyError };
//# sourceMappingURL=errors.mjs.map
