'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var sumSerializerSizes = require('./sumSerializerSizes.cjs');

/**
 * Get the name and serializer of each field in a struct.
 * @category Serializers
 */

/**
 * Creates a serializer for a custom object.
 *
 * @param fields - The name and serializer of each field.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
function struct(fields, options = {}) {
  const fieldDescriptions = fields.map(([name, serializer]) => `${String(name)}: ${serializer.description}`).join(', ');
  return {
    description: options.description ?? `struct(${fieldDescriptions})`,
    fixedSize: sumSerializerSizes.sumSerializerSizes(fields.map(([, field]) => field.fixedSize)),
    maxSize: sumSerializerSizes.sumSerializerSizes(fields.map(([, field]) => field.maxSize)),
    serialize: struct => {
      const fieldBytes = fields.map(([key, serializer]) => serializer.serialize(struct[key]));
      return umiSerializersCore.mergeBytes(fieldBytes);
    },
    deserialize: (bytes, offset = 0) => {
      const struct = {};
      fields.forEach(([key, serializer]) => {
        const [value, newOffset] = serializer.deserialize(bytes, offset);
        offset = newOffset;
        struct[key] = value;
      });
      return [struct, offset];
    }
  };
}

exports.struct = struct;
//# sourceMappingURL=struct.cjs.map
