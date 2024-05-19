import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { NumberSerializer } from '@metaplex-foundation/umi-serializers-numbers';
/**
 * Defines the options for boolean serializers.
 * @category Serializers
 */
export type BoolSerializerOptions = BaseSerializerOptions & {
    /**
     * The number serializer to delegate to.
     * @defaultValue `u8()`
     */
    size?: NumberSerializer;
};
/**
 * Creates a boolean serializer.
 *
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function bool(options?: BoolSerializerOptions): Serializer<boolean>;
