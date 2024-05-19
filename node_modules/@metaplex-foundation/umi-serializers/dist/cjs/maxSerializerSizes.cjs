'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function maxSerializerSizes(sizes) {
  return sizes.reduce((all, size) => all === null || size === null ? null : Math.max(all, size), 0);
}

exports.maxSerializerSizes = maxSerializerSizes;
//# sourceMappingURL=maxSerializerSizes.cjs.map
