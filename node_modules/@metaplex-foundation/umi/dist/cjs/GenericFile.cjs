'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializers = require('@metaplex-foundation/umi-serializers');
var randomStrings = require('./utils/randomStrings.cjs');

/**
 * A generic definition of a File represented as a buffer with
 * extra metadata such as a file name, content type, and tags.
 *
 * @category Storage
 */

/**
 * Creates a new {@link GenericFile} from a buffer and a file name.
 * @category Storage
 */
const createGenericFile = (content, fileName, options = {}) => ({
  buffer: typeof content === 'string' ? umiSerializers.utf8.serialize(content) : content,
  fileName,
  displayName: options.displayName ?? fileName,
  uniqueName: options.uniqueName ?? randomStrings.generateRandomString(),
  contentType: options.contentType ?? null,
  extension: options.extension ?? getExtension(fileName),
  tags: options.tags ?? []
});

/**
 * Creates a new {@link GenericFile} from a {@link BrowserFile}.
 * @category Storage
 */
const createGenericFileFromBrowserFile = async (browserFile, options = {}) => createGenericFile(new Uint8Array(await browserFile.arrayBuffer()), browserFile.name, options);

/**
 * Creates a new {@link GenericFile} from a JSON object.
 * @category Storage
 */
const createGenericFileFromJson = (json, fileName = 'inline.json', options = {}) => createGenericFile(JSON.stringify(json), fileName, {
  contentType: 'application/json',
  ...options
});

/**
 * Creates a new {@link BrowserFile} from a {@link GenericFile}.
 * @category Storage
 */
const createBrowserFileFromGenericFile = file => new File([file.buffer], file.fileName);

/**
 * Returns the content of a {@link GenericFile} as a parsed JSON object.
 * @category Storage
 */
const parseJsonFromGenericFile = file => JSON.parse(new TextDecoder().decode(file.buffer));

/**
 * Returns the total size of a list of {@link GenericFile} in bytes.
 * @category Storage
 */
const getBytesFromGenericFiles = (...files) => files.reduce((acc, file) => acc + file.buffer.byteLength, 0);

/**
 * Whether the given value is a {@link GenericFile}.
 * @category Storage
 */
const isGenericFile = file => file != null && typeof file === 'object' && 'buffer' in file && 'fileName' in file && 'displayName' in file && 'uniqueName' in file && 'contentType' in file && 'extension' in file && 'tags' in file;

/**
 * Returns the extension of a file name.
 * @category Storage
 */
const getExtension = fileName => {
  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex < 0 ? null : fileName.slice(lastDotIndex + 1);
};

exports.createBrowserFileFromGenericFile = createBrowserFileFromGenericFile;
exports.createGenericFile = createGenericFile;
exports.createGenericFileFromBrowserFile = createGenericFileFromBrowserFile;
exports.createGenericFileFromJson = createGenericFileFromJson;
exports.getBytesFromGenericFiles = getBytesFromGenericFiles;
exports.isGenericFile = isGenericFile;
exports.parseJsonFromGenericFile = parseJsonFromGenericFile;
//# sourceMappingURL=GenericFile.cjs.map
