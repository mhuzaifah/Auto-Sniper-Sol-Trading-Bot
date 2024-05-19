'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var DownloaderInterface = require('./DownloaderInterface.cjs');
var EddsaInterface = require('./EddsaInterface.cjs');
var HttpInterface = require('./HttpInterface.cjs');
var ProgramRepositoryInterface = require('./ProgramRepositoryInterface.cjs');
var RpcInterface = require('./RpcInterface.cjs');
var SerializerInterface = require('./SerializerInterface.cjs');
var Signer = require('./Signer.cjs');
var TransactionFactoryInterface = require('./TransactionFactoryInterface.cjs');
var UploaderInterface = require('./UploaderInterface.cjs');

/**
 * A Umi context object that uses all of the interfaces provided by Umi.
 * Once created, the end-user can pass this object to any function that
 * requires some or all of these interfaces.
 *
 * @category Context and Interfaces
 */

/**
 * A helper method that creates a Umi context object using only
 * Null implementations of the interfaces. This can be useful to
 * create a full Umi context object when only a few of the interfaces
 * are needed.
 *
 * @category Context and Interfaces
 */
const createNullContext = () => ({
  downloader: DownloaderInterface.createNullDownloader(),
  eddsa: EddsaInterface.createNullEddsa(),
  http: HttpInterface.createNullHttp(),
  identity: Signer.createNullSigner(),
  payer: Signer.createNullSigner(),
  programs: ProgramRepositoryInterface.createNullProgramRepository(),
  rpc: RpcInterface.createNullRpc(),
  serializer: SerializerInterface.createNullSerializer(),
  transactions: TransactionFactoryInterface.createNullTransactionFactory(),
  uploader: UploaderInterface.createNullUploader()
});

exports.createNullContext = createNullContext;
//# sourceMappingURL=Context.cjs.map
