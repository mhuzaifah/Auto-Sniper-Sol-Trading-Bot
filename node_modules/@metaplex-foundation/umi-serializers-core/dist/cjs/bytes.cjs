'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Concatenates an array of `Uint8Array`s into a single `Uint8Array`.
 * @category Utils
 */
const mergeBytes = bytesArr => {
  const totalLength = bytesArr.reduce((total, arr) => total + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  bytesArr.forEach(arr => {
    result.set(arr, offset);
    offset += arr.length;
  });
  return result;
};

/**
 * Pads a `Uint8Array` with zeroes to the specified length.
 * If the array is longer than the specified length, it is returned as-is.
 * @category Utils
 */
const padBytes = (bytes, length) => {
  if (bytes.length >= length) return bytes;
  const paddedBytes = new Uint8Array(length).fill(0);
  paddedBytes.set(bytes);
  return paddedBytes;
};

/**
 * Fixes a `Uint8Array` to the specified length.
 * If the array is longer than the specified length, it is truncated.
 * If the array is shorter than the specified length, it is padded with zeroes.
 * @category Utils
 */
const fixBytes = (bytes, length) => padBytes(bytes.slice(0, length), length);

exports.fixBytes = fixBytes;
exports.mergeBytes = mergeBytes;
exports.padBytes = padBytes;
//# sourceMappingURL=bytes.cjs.map
