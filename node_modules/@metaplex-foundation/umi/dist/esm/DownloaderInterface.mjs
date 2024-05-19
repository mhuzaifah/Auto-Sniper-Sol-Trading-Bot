import { InterfaceImplementationMissingError } from './errors/InterfaceImplementationMissingError.mjs';

/**
 * An implementation of the {@link DownloaderInterface} that throws an error when called.
 * @category Storage
 */
function createNullDownloader() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError('DownloaderInterface', 'downloader');
  };
  return {
    download: errorHandler,
    downloadJson: errorHandler
  };
}

export { createNullDownloader };
//# sourceMappingURL=DownloaderInterface.mjs.map
