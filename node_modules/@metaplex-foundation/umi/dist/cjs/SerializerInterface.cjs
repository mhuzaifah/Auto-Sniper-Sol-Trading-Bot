'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InterfaceImplementationMissingError = require('./errors/InterfaceImplementationMissingError.cjs');

/**
 * Defines the interface for a set of serializers
 * that can be used to serialize/deserialize any Serde types.
 *
 * @category Context and Interfaces
 * @deprecated This interface is deprecated.
 * You can now directly use `@metaplex-foundation/umi/serializers` instead.
 */

/**
 * An implementation of the {@link SerializerInterface} that throws an error when called.
 * @category Serializers
 */
function createNullSerializer() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError.InterfaceImplementationMissingError('SerializerInterface', 'serializer');
  };
  return {
    tuple: errorHandler,
    array: errorHandler,
    map: errorHandler,
    set: errorHandler,
    option: errorHandler,
    nullable: errorHandler,
    struct: errorHandler,
    enum: errorHandler,
    dataEnum: errorHandler,
    string: errorHandler,
    bool: errorHandler,
    unit: errorHandler,
    u8: errorHandler,
    u16: errorHandler,
    u32: errorHandler,
    u64: errorHandler,
    u128: errorHandler,
    i8: errorHandler,
    i16: errorHandler,
    i32: errorHandler,
    i64: errorHandler,
    i128: errorHandler,
    f32: errorHandler,
    f64: errorHandler,
    bytes: errorHandler,
    publicKey: errorHandler
  };
}

exports.createNullSerializer = createNullSerializer;
//# sourceMappingURL=SerializerInterface.cjs.map
