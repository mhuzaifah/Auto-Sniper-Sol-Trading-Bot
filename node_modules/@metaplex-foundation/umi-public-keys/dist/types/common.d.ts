/**
 * The amount of bytes in a public key.
 * @category Signers and PublicKeys
 */
export declare const PUBLIC_KEY_LENGTH = 32;
/**
 * Defines a public key as a base58 string.
 * @category Signers and PublicKeys
 */
export type PublicKey<TAddress extends string = string> = TAddress & {
    readonly __publicKey: unique symbol;
};
/**
 * Defines a Program-Derived Address.
 *
 * It is a public key with the bump number that was used
 * to ensure the address is not on the ed25519 curve.
 *
 * @category Signers and PublicKeys
 */
export type Pda<TAddress extends string = string, TBump extends number = number> = [PublicKey<TAddress>, TBump] & {
    readonly __pda: unique symbol;
};
/**
 * A Uint8Array that represents a public key.
 * @category Signers and PublicKeys
 */
export type PublicKeyBytes = Uint8Array & {
    readonly __publicKeyBytes: unique symbol;
};
/**
 * Defines an object that has a public key.
 * @category Signers and PublicKeys
 */
export type HasPublicKey<TAddress extends string = string> = {
    readonly publicKey: PublicKey<TAddress>;
};
/**
 * Defines an object that can be converted to a base58 public key.
 * @category Signers and PublicKeys
 */
export type LegacyWeb3JsPublicKey<TAddress extends string = string> = {
    toBase58: () => TAddress;
};
/**
 * Defines all the possible inputs for creating a public key.
 * @category Signers and PublicKeys
 */
export type PublicKeyInput<TAddress extends string = string> = TAddress | Uint8Array | [TAddress, number] | {
    publicKey: TAddress;
} | LegacyWeb3JsPublicKey<TAddress>;
/**
 * Defines all the possible safe inputs for creating a public key.
 * That is, they have already been validated to be or
 * to contain a valid public key.
 * @category Signers and PublicKeys
 */
export type SafePublicKeyInput<TAddress extends string = string> = PublicKey<TAddress> | PublicKeyBytes | Pda<TAddress> | HasPublicKey<TAddress> | LegacyWeb3JsPublicKey<TAddress>;
/**
 * Creates a new public key from the given input.
 * @category Signers and PublicKeys
 */
export declare function publicKey<TAddress extends string>(input: PublicKeyInput<TAddress>, assertValidPublicKey?: true): PublicKey<TAddress>;
export declare function publicKey<TAddress extends string>(input: SafePublicKeyInput<TAddress>, assertValidPublicKey: false): PublicKey<TAddress>;
/**
 * Creates the default public key which is composed of all zero bytes.
 * @category Signers and PublicKeys
 */
export declare const defaultPublicKey: () => PublicKey<"11111111111111111111111111111111">;
/**
 * Whether the given value is a valid public key.
 * @category Signers and PublicKeys
 */
export declare const isPublicKey: <TAddress extends string>(value: TAddress) => value is PublicKey<TAddress>;
/**
 * Whether the given value is a valid program-derived address.
 * @category Signers and PublicKeys
 */
export declare const isPda: <TAddress extends string, TBump extends number>(value: [TAddress, TBump]) => value is Pda<TAddress, TBump>;
/**
 * Ensures the given value is a valid public key.
 * @category Signers and PublicKeys
 */
export declare function assertPublicKey<TAddress extends string>(value: TAddress): asserts value is PublicKey<TAddress>;
/**
 * Deduplicates the given array of public keys.
 * @category Signers and PublicKeys
 */
export declare const uniquePublicKeys: (publicKeys: PublicKey[]) => PublicKey[];
/**
 * Converts the given public key to a Uint8Array.
 * Throws an error if the public key is an invalid base58 string.
 * @category Signers and PublicKeys
 */
export declare const publicKeyBytes: (value: string) => PublicKeyBytes;
/**
 * Converts the given public key to a base58 string.
 * @category Signers and PublicKeys
 * @deprecated Public keys are now represented directly as base58 strings.
 */
export declare const base58PublicKey: (key: PublicKeyInput) => string;
/**
 * Whether the given public keys are the same.
 * @category Signers and PublicKeys
 * @deprecated Use `left === right` instead now that public keys are base58 strings.
 */
export declare const samePublicKey: (left: PublicKeyInput, right: PublicKeyInput) => boolean;
