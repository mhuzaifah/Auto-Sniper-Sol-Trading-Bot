function sumSerializerSizes(sizes) {
  return sizes.reduce((all, size) => all === null || size === null ? null : all + size, 0);
}

export { sumSerializerSizes };
//# sourceMappingURL=sumSerializerSizes.mjs.map
