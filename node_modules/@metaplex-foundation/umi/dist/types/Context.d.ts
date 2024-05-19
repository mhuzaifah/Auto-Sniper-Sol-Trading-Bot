import { DownloaderInterface } from './DownloaderInterface';
import { EddsaInterface } from './EddsaInterface';
import { HttpInterface } from './HttpInterface';
import { ProgramRepositoryInterface } from './ProgramRepositoryInterface';
import { RpcInterface } from './RpcInterface';
import { SerializerInterface } from './SerializerInterface';
import { Signer } from './Signer';
import { TransactionFactoryInterface } from './TransactionFactoryInterface';
import { UploaderInterface } from './UploaderInterface';
/**
 * A Umi context object that uses all of the interfaces provided by Umi.
 * Once created, the end-user can pass this object to any function that
 * requires some or all of these interfaces.
 *
 * @category Context and Interfaces
 */
export interface Context {
    /** An interface for downloading files from URIs. */
    downloader: DownloaderInterface;
    /** An interface for managing public and private keys. */
    eddsa: EddsaInterface;
    /** An interface for sending HTTP requests. */
    http: HttpInterface;
    /** The signer using your app. */
    identity: Signer;
    /** The signer paying for things, usually the same as the `identity`. */
    payer: Signer;
    /** An interface for registering and retrieving programs. */
    programs: ProgramRepositoryInterface;
    /** An interface for sending RPC requests. */
    rpc: RpcInterface;
    /**
     * An interface for serializing various types.
     * @deprecated This interface is deprecated.
     * You can now directly use `@metaplex-foundation/umi/serializers` instead.
     */
    serializer: SerializerInterface;
    /** An interface for managing transactions. */
    transactions: TransactionFactoryInterface;
    /** An interface for uploading files and getting their URIs. */
    uploader: UploaderInterface;
}
/**
 * A helper method that creates a Umi context object using only
 * Null implementations of the interfaces. This can be useful to
 * create a full Umi context object when only a few of the interfaces
 * are needed.
 *
 * @category Context and Interfaces
 */
export declare const createNullContext: () => Context;
