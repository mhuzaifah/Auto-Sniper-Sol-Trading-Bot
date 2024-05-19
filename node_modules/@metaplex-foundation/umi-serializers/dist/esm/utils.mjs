import { UnrecognizedArrayLikeSerializerSizeError } from './errors.mjs';
import { sumSerializerSizes } from './sumSerializerSizes.mjs';

function getResolvedSize(size, bytes, offset) {
  if (typeof size === 'number') {
    return [size, offset];
  }
  if (typeof size === 'object') {
    return size.deserialize(bytes, offset);
  }
  throw new UnrecognizedArrayLikeSerializerSizeError(size);
}
function getSizeDescription(size) {
  return typeof size === 'object' ? size.description : `${size}`;
}
function getSizeFromChildren(size, childrenSizes) {
  if (typeof size !== 'number') return null;
  if (size === 0) return 0;
  const childrenSize = sumSerializerSizes(childrenSizes);
  return childrenSize === null ? null : childrenSize * size;
}
function getSizePrefix(size, realSize) {
  return typeof size === 'object' ? size.serialize(realSize) : new Uint8Array();
}

export { getResolvedSize, getSizeDescription, getSizeFromChildren, getSizePrefix };
//# sourceMappingURL=utils.mjs.map
