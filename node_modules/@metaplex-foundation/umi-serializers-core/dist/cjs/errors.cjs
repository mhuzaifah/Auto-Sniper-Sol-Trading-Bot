'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/** @category Errors */
class DeserializingEmptyBufferError extends Error {
  name = 'DeserializingEmptyBufferError';
  constructor(serializer) {
    super(`Serializer [${serializer}] cannot deserialize empty buffers.`);
  }
}

/** @category Errors */
class NotEnoughBytesError extends Error {
  name = 'NotEnoughBytesError';
  constructor(serializer, expected, actual) {
    super(`Serializer [${serializer}] expected ${expected} bytes, got ${actual}.`);
  }
}

/** @category Errors */
class ExpectedFixedSizeSerializerError extends Error {
  name = 'ExpectedFixedSizeSerializerError';
  constructor(message) {
    message ??= 'Expected a fixed-size serializer, got a variable-size one.';
    super(message);
  }
}

exports.DeserializingEmptyBufferError = DeserializingEmptyBufferError;
exports.ExpectedFixedSizeSerializerError = ExpectedFixedSizeSerializerError;
exports.NotEnoughBytesError = NotEnoughBytesError;
//# sourceMappingURL=errors.cjs.map
