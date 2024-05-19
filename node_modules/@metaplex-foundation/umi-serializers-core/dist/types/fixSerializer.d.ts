import { Serializer } from './common';
/**
 * Creates a fixed-size serializer from a given serializer.
 *
 * @param serializer - The serializer to wrap into a fixed-size serializer.
 * @param fixedBytes - The fixed number of bytes to read.
 * @param description - A custom description for the serializer.
 *
 * @category Serializers
 */
export declare function fixSerializer<T, U extends T = T>(serializer: Serializer<T, U>, fixedBytes: number, description?: string): Serializer<T, U>;
