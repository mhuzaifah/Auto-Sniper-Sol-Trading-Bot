'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var common = require('./common.cjs');
var errors = require('./errors.cjs');

function numberFactory(input) {
  let littleEndian;
  let defaultDescription = input.name;
  if (input.size > 1) {
    littleEndian = !('endian' in input.options) || input.options.endian === common.Endian.Little;
    defaultDescription += littleEndian ? '(le)' : '(be)';
  }
  return {
    description: input.options.description ?? defaultDescription,
    fixedSize: input.size,
    maxSize: input.size,
    serialize(value) {
      if (input.range) {
        assertRange(input.name, input.range[0], input.range[1], value);
      }
      const buffer = new ArrayBuffer(input.size);
      input.set(new DataView(buffer), value, littleEndian);
      return new Uint8Array(buffer);
    },
    deserialize(bytes, offset = 0) {
      const slice = bytes.slice(offset, offset + input.size);
      assertEnoughBytes('i8', slice, input.size);
      const view = toDataView(slice);
      return [input.get(view, littleEndian), offset + input.size];
    }
  };
}

/**
 * Helper function to ensure that the array buffer is converted properly from a uint8array
 * Source: https://stackoverflow.com/questions/37228285/uint8array-to-arraybuffer
 * @param {Uint8Array} array Uint8array that's being converted into an array buffer
 * @returns {ArrayBuffer} An array buffer that's necessary to construct a data view
 */
const toArrayBuffer = array => array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
const toDataView = array => new DataView(toArrayBuffer(array));
const assertRange = (serializer, min, max, value) => {
  if (value < min || value > max) {
    throw new errors.NumberOutOfRangeError(serializer, min, max, value);
  }
};
const assertEnoughBytes = (serializer, bytes, expected) => {
  if (bytes.length === 0) {
    throw new umiSerializersCore.DeserializingEmptyBufferError(serializer);
  }
  if (bytes.length < expected) {
    throw new umiSerializersCore.NotEnoughBytesError(serializer, expected, bytes.length);
  }
};

exports.assertEnoughBytes = assertEnoughBytes;
exports.assertRange = assertRange;
exports.numberFactory = numberFactory;
exports.toArrayBuffer = toArrayBuffer;
exports.toDataView = toDataView;
//# sourceMappingURL=utils.cjs.map
