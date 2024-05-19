import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
/**
 * Defines the options for unit serializers.
 * @category Serializers
 */
export type UnitSerializerOptions = BaseSerializerOptions;
/**
 * Creates a void serializer.
 *
 * @param options - A set of options for the serializer.
 */
export declare function unit(options?: UnitSerializerOptions): Serializer<void>;
