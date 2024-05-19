import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { NumberSerializer } from '@metaplex-foundation/umi-serializers-numbers';
/**
 * Defines a scalar enum as a type from its constructor.
 *
 * @example
 * ```ts
 * enum Direction { Left, Right };
 * type DirectionType = ScalarEnum<Direction>;
 * ```
 *
 * @category Serializers
 */
export type ScalarEnum<T> = {
    [key: number | string]: string | number | T;
} | number | T;
/**
 * Defines the options for scalar enum serializers.
 * @category Serializers
 */
export type ScalarEnumSerializerOptions = BaseSerializerOptions & {
    /**
     * The serializer to use for the enum discriminator.
     * @defaultValue `u8()`
     */
    size?: NumberSerializer;
};
/**
 * Creates a scalar enum serializer.
 *
 * @param constructor - The constructor of the scalar enum.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function scalarEnum<T>(constructor: ScalarEnum<T> & {}, options?: ScalarEnumSerializerOptions): Serializer<T>;
