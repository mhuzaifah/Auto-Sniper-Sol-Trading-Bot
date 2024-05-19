/**
 * A generic definition of a File represented as a buffer with
 * extra metadata such as a file name, content type, and tags.
 *
 * @category Storage
 */
export type GenericFile = {
    readonly buffer: Uint8Array;
    readonly fileName: string;
    readonly displayName: string;
    readonly uniqueName: string;
    readonly contentType: string | null;
    readonly extension: string | null;
    readonly tags: GenericFileTag[];
};
/**
 * Represent a custom tag that can be attached to a file.
 * @category Storage
 */
export type GenericFileTag = {
    name: string;
    value: string;
};
/**
 * Alias for the native File interface from the browser.
 * @category Storage
 */
export type BrowserFile = File;
/**
 * Represents the options that can be provided when creating a {@link GenericFile}.
 * @category Storage
 */
export type GenericFileOptions = {
    displayName?: string;
    uniqueName?: string;
    contentType?: string;
    extension?: string;
    tags?: {
        name: string;
        value: string;
    }[];
};
/**
 * Creates a new {@link GenericFile} from a buffer and a file name.
 * @category Storage
 */
export declare const createGenericFile: (content: string | Uint8Array, fileName: string, options?: GenericFileOptions) => GenericFile;
/**
 * Creates a new {@link GenericFile} from a {@link BrowserFile}.
 * @category Storage
 */
export declare const createGenericFileFromBrowserFile: (browserFile: BrowserFile, options?: GenericFileOptions) => Promise<GenericFile>;
/**
 * Creates a new {@link GenericFile} from a JSON object.
 * @category Storage
 */
export declare const createGenericFileFromJson: <T>(json: T, fileName?: string, options?: GenericFileOptions) => GenericFile;
/**
 * Creates a new {@link BrowserFile} from a {@link GenericFile}.
 * @category Storage
 */
export declare const createBrowserFileFromGenericFile: (file: GenericFile) => BrowserFile;
/**
 * Returns the content of a {@link GenericFile} as a parsed JSON object.
 * @category Storage
 */
export declare const parseJsonFromGenericFile: <T>(file: GenericFile) => T;
/**
 * Returns the total size of a list of {@link GenericFile} in bytes.
 * @category Storage
 */
export declare const getBytesFromGenericFiles: (...files: GenericFile[]) => number;
/**
 * Whether the given value is a {@link GenericFile}.
 * @category Storage
 */
export declare const isGenericFile: (file: any) => file is GenericFile;
