'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nullCharacters = require('./nullCharacters.cjs');

/**
 * A string serializer that uses UTF-8 encoding
 * using the native `TextEncoder` API.
 * @category Serializers
 */
const utf8 = {
  description: 'utf8',
  fixedSize: null,
  maxSize: null,
  serialize(value) {
    return new TextEncoder().encode(value);
  },
  deserialize(buffer, offset = 0) {
    const value = new TextDecoder().decode(buffer.slice(offset));
    return [nullCharacters.removeNullCharacters(value), buffer.length];
  }
};

exports.utf8 = utf8;
//# sourceMappingURL=utf8.cjs.map
