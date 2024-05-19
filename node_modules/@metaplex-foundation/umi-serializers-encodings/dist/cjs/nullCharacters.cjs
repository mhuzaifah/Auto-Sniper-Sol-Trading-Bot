'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Removes null characters from a string.
 * @category Utils
 */
const removeNullCharacters = value =>
// eslint-disable-next-line no-control-regex
value.replace(/\u0000/g, '');

/**
 * Pads a string with null characters at the end.
 * @category Utils
 */
const padNullCharacters = (value, chars) => value.padEnd(chars, '\u0000');

exports.padNullCharacters = padNullCharacters;
exports.removeNullCharacters = removeNullCharacters;
//# sourceMappingURL=nullCharacters.cjs.map
