/**
 * Chunks an array into smaller arrays of (at most) the specified size.
 * @category Utils
 */
const chunk = (array, chunkSize) => array.reduce((chunks, item, index) => {
  const chunkIndex = Math.floor(index / chunkSize);
  if (!chunks[chunkIndex]) {
    chunks[chunkIndex] = [];
  }
  chunks[chunkIndex].push(item);
  return chunks;
}, []);

/**
 * Zips two arrays together, using the provided function to map the values.
 * @category Utils
 */
const zipMap = (left, right, fn) => left.map((t, index) => fn(t, right?.[index] ?? null, index));

/**
 * Deduplicates an array by the provided function.
 * @category Utils
 */
const uniqueBy = (array, fn) => array.reduce((acc, v) => {
  if (!acc.some(x => fn(v, x))) acc.push(v);
  return acc;
}, []);

export { chunk, uniqueBy, zipMap };
//# sourceMappingURL=arrays.mjs.map
