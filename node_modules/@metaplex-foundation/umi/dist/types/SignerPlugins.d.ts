import { Keypair } from './Keypair';
import type { UmiPlugin } from './UmiPlugin';
import type { Signer } from './Signer';
/**
 * Umi plugin that sets the identity and the payer to the given signer.
 * @category Signers and PublicKeys
 */
export declare const signerIdentity: (signer: Signer, setPayer?: boolean) => UmiPlugin;
/**
 * Umi plugin that only sets the payer to the given signer.
 * @category Signers and PublicKeys
 */
export declare const signerPayer: (signer: Signer) => UmiPlugin;
/**
 * Umi plugin that sets the identity and the payer to a randomly generated signer.
 * @category Signers and PublicKeys
 */
export declare const generatedSignerIdentity: (setPayer?: boolean) => UmiPlugin;
/**
 * Umi plugin that only sets the payer to a randomly generated signer.
 * @category Signers and PublicKeys
 */
export declare const generatedSignerPayer: () => UmiPlugin;
/**
 * Umi plugin that sets the identity and the payer to a provided keypair.
 * @category Signers and PublicKeys
 */
export declare const keypairIdentity: (keypair: Keypair, setPayer?: boolean) => UmiPlugin;
/**
 * Umi plugin that only sets the payer to a provided keypair.
 * @category Signers and PublicKeys
 */
export declare const keypairPayer: (keypair: Keypair) => UmiPlugin;
