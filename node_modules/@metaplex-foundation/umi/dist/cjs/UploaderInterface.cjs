'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InterfaceImplementationMissingError = require('./errors/InterfaceImplementationMissingError.cjs');

/**
 * An implementation of the {@link UploaderInterface} that throws an error when called.
 * @category Storage
 */
function createNullUploader() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError.InterfaceImplementationMissingError('UploaderInterface', 'uploader');
  };
  return {
    upload: errorHandler,
    uploadJson: errorHandler,
    getUploadPrice: errorHandler
  };
}

exports.createNullUploader = createNullUploader;
//# sourceMappingURL=UploaderInterface.cjs.map
