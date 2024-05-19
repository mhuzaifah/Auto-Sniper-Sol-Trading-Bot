'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InterfaceImplementationMissingError = require('./errors/InterfaceImplementationMissingError.cjs');

/**
 * An implementation of the {@link DownloaderInterface} that throws an error when called.
 * @category Storage
 */
function createNullDownloader() {
  const errorHandler = () => {
    throw new InterfaceImplementationMissingError.InterfaceImplementationMissingError('DownloaderInterface', 'downloader');
  };
  return {
    download: errorHandler,
    downloadJson: errorHandler
  };
}

exports.createNullDownloader = createNullDownloader;
//# sourceMappingURL=DownloaderInterface.cjs.map
