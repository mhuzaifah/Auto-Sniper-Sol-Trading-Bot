import type { PublicKey } from '@metaplex-foundation/umi-public-keys';
import type { Context } from './Context';
import type { Signer } from './Signer';
/**
 * Represents a keypair with a public key and a secret key.
 * @category Signers and PublicKeys
 */
export type Keypair = {
    publicKey: PublicKey;
    secretKey: Uint8Array;
};
/**
 * Represent a {@link Signer} that can is aware of its secret key.
 * @category Signers and PublicKeys
 */
export type KeypairSigner = Signer & Keypair;
/**
 * Generate a new random {@link KeypairSigner} using the Eddsa interface.
 * @category Signers and PublicKeys
 */
export declare const generateSigner: (context: Pick<Context, 'eddsa'>) => KeypairSigner;
/**
 * Creates a {@link KeypairSigner} from a {@link Keypair} object.
 * @category Signers and PublicKeys
 */
export declare const createSignerFromKeypair: (context: Pick<Context, 'eddsa'>, keypair: Keypair) => KeypairSigner;
/**
 * Whether the given signer is a {@link KeypairSigner}.
 * @category Signers and PublicKeys
 */
export declare const isKeypairSigner: (signer: Signer & {
    secretKey?: Uint8Array;
}) => signer is KeypairSigner;
