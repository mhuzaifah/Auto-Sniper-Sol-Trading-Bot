import { InvalidBaseStringError } from './errors.mjs';

/**
 * A string serializer that uses base16 encoding.
 * @category Serializers
 */
const base16 = {
  description: 'base16',
  fixedSize: null,
  maxSize: null,
  serialize(value) {
    const lowercaseValue = value.toLowerCase();
    if (!lowercaseValue.match(/^[0123456789abcdef]*$/)) {
      throw new InvalidBaseStringError(value, 16);
    }
    const matches = lowercaseValue.match(/.{1,2}/g);
    return Uint8Array.from(matches ? matches.map(byte => parseInt(byte, 16)) : []);
  },
  deserialize(buffer, offset = 0) {
    const value = buffer.slice(offset).reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
    return [value, buffer.length];
  }
};

export { base16 };
//# sourceMappingURL=base16.mjs.map
