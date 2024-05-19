'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Generate a random string of the given length.
 * Warning: This is not a cryptographically secure random string generator.
 * @category Utils
 */
const generateRandomString = (length = 20, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
  let result = '';
  const alphabetLength = alphabet.length;
  for (let i = 0; i < length; i += 1) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }
  return result;
};

exports.generateRandomString = generateRandomString;
//# sourceMappingURL=randomStrings.cjs.map
