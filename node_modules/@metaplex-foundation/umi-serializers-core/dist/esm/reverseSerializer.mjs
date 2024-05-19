import { mergeBytes } from './bytes.mjs';
import { ExpectedFixedSizeSerializerError } from './errors.mjs';

/**
 * Reverses the bytes of a fixed-size serializer.
 * @category Serializers
 */
function reverseSerializer(serializer) {
  if (serializer.fixedSize === null) {
    throw new ExpectedFixedSizeSerializerError('Cannot reverse a serializer of variable size.');
  }
  return {
    ...serializer,
    serialize: value => serializer.serialize(value).reverse(),
    deserialize: (bytes, offset = 0) => {
      const fixedSize = serializer.fixedSize;
      const newBytes = mergeBytes([bytes.slice(0, offset), bytes.slice(offset, offset + fixedSize).reverse(), bytes.slice(offset + fixedSize)]);
      return serializer.deserialize(newBytes, offset);
    }
  };
}

export { reverseSerializer };
//# sourceMappingURL=reverseSerializer.mjs.map
