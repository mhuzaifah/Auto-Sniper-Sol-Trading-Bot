import { Serializer } from './common';
/**
 * Reverses the bytes of a fixed-size serializer.
 * @category Serializers
 */
export declare function reverseSerializer<T, U extends T = T>(serializer: Serializer<T, U>): Serializer<T, U>;
