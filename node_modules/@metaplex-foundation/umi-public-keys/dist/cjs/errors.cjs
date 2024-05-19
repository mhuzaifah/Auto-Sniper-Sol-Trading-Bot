'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/** @category Errors */
class InvalidPublicKeyError extends Error {
  name = 'InvalidPublicKeyError';
  constructor(invalidPublicKey, reason) {
    reason = reason ? `. ${reason}` : '';
    super(`The provided public key is invalid: ${invalidPublicKey}${reason}`);
    this.invalidPublicKey = invalidPublicKey;
  }
}

exports.InvalidPublicKeyError = InvalidPublicKeyError;
//# sourceMappingURL=errors.cjs.map
