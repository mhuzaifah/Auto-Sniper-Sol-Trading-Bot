'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bytes = require('./bytes.cjs');
var errors = require('./errors.cjs');

/**
 * Reverses the bytes of a fixed-size serializer.
 * @category Serializers
 */
function reverseSerializer(serializer) {
  if (serializer.fixedSize === null) {
    throw new errors.ExpectedFixedSizeSerializerError('Cannot reverse a serializer of variable size.');
  }
  return {
    ...serializer,
    serialize: value => serializer.serialize(value).reverse(),
    deserialize: (bytes$1, offset = 0) => {
      const fixedSize = serializer.fixedSize;
      const newBytes = bytes.mergeBytes([bytes$1.slice(0, offset), bytes$1.slice(offset, offset + fixedSize).reverse(), bytes$1.slice(offset + fixedSize)]);
      return serializer.deserialize(newBytes, offset);
    }
  };
}

exports.reverseSerializer = reverseSerializer;
//# sourceMappingURL=reverseSerializer.cjs.map
