import { createNullDownloader } from './DownloaderInterface.mjs';
import { createNullEddsa } from './EddsaInterface.mjs';
import { createNullHttp } from './HttpInterface.mjs';
import { createNullProgramRepository } from './ProgramRepositoryInterface.mjs';
import { createNullRpc } from './RpcInterface.mjs';
import { createNullSerializer } from './SerializerInterface.mjs';
import { createNullSigner } from './Signer.mjs';
import { createNullTransactionFactory } from './TransactionFactoryInterface.mjs';
import { createNullUploader } from './UploaderInterface.mjs';

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
  downloader: createNullDownloader(),
  eddsa: createNullEddsa(),
  http: createNullHttp(),
  identity: createNullSigner(),
  payer: createNullSigner(),
  programs: createNullProgramRepository(),
  rpc: createNullRpc(),
  serializer: createNullSerializer(),
  transactions: createNullTransactionFactory(),
  uploader: createNullUploader()
});

export { createNullContext };
//# sourceMappingURL=Context.mjs.map
