'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var errors = require('./errors.cjs');
var sumSerializerSizes = require('./sumSerializerSizes.cjs');

function getResolvedSize(size, bytes, offset) {
  if (typeof size === 'number') {
    return [size, offset];
  }
  if (typeof size === 'object') {
    return size.deserialize(bytes, offset);
  }
  throw new errors.UnrecognizedArrayLikeSerializerSizeError(size);
}
function getSizeDescription(size) {
  return typeof size === 'object' ? size.description : `${size}`;
}
function getSizeFromChildren(size, childrenSizes) {
  if (typeof size !== 'number') return null;
  if (size === 0) return 0;
  const childrenSize = sumSerializerSizes.sumSerializerSizes(childrenSizes);
  return childrenSize === null ? null : childrenSize * size;
}
function getSizePrefix(size, realSize) {
  return typeof size === 'object' ? size.serialize(realSize) : new Uint8Array();
}

exports.getResolvedSize = getResolvedSize;
exports.getSizeDescription = getSizeDescription;
exports.getSizeFromChildren = getSizeFromChildren;
exports.getSizePrefix = getSizePrefix;
//# sourceMappingURL=utils.cjs.map
