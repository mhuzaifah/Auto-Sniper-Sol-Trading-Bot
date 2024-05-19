import { mapSerializer } from '@metaplex-foundation/umi-serializers-core';
import { baseXReslice } from './baseXReslice.mjs';

/**
 * A string serializer that uses base64 encoding.
 * @category Serializers
 */
const base64 = mapSerializer(baseXReslice('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', 6), value => value.replace(/=/g, ''), value => value.padEnd(Math.ceil(value.length / 4) * 4, '='));

export { base64 };
//# sourceMappingURL=base64.mjs.map
