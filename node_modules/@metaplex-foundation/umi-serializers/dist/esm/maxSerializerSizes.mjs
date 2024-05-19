function maxSerializerSizes(sizes) {
  return sizes.reduce((all, size) => all === null || size === null ? null : Math.max(all, size), 0);
}

export { maxSerializerSizes };
//# sourceMappingURL=maxSerializerSizes.mjs.map
