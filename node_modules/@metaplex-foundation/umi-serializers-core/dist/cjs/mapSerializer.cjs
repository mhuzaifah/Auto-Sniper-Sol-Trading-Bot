'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Converts a serializer A to a serializer B by mapping their values.
 * @category Serializers
 */

function mapSerializer(serializer, unmap, map) {
  return {
    description: serializer.description,
    fixedSize: serializer.fixedSize,
    maxSize: serializer.maxSize,
    serialize: value => serializer.serialize(unmap(value)),
    deserialize: (buffer, offset = 0) => {
      const [value, length] = serializer.deserialize(buffer, offset);
      return map ? [map(value, buffer, offset), length] : [value, length];
    }
  };
}

exports.mapSerializer = mapSerializer;
//# sourceMappingURL=mapSerializer.cjs.map
