'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Defines the options for unit serializers.
 * @category Serializers
 */

/**
 * Creates a void serializer.
 *
 * @param options - A set of options for the serializer.
 */
function unit(options = {}) {
  return {
    description: options.description ?? 'unit',
    fixedSize: 0,
    maxSize: 0,
    serialize: () => new Uint8Array(),
    deserialize: (_bytes, offset = 0) => [undefined, offset]
  };
}

exports.unit = unit;
//# sourceMappingURL=unit.cjs.map
