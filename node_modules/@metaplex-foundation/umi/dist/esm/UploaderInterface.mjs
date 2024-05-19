import { InterfaceImplementationMissingError } from './errors/InterfaceImplementationMissingError.mjs';

/**
 * An implementation of the {@link UploaderInterface} that throws an error when called.
 * @category Storage
 */
function createNullUploader() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError('UploaderInterface', 'uploader');
  };
  return {
    upload: errorHandler,
    uploadJson: errorHandler,
    getUploadPrice: errorHandler
  };
}

export { createNullUploader };
//# sourceMappingURL=UploaderInterface.mjs.map
