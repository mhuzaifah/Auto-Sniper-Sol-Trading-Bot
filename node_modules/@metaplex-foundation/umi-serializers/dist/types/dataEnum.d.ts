import { BaseSerializerOptions, Serializer } from '@metaplex-foundation/umi-serializers-core';
import { NumberSerializer } from '@metaplex-foundation/umi-serializers-numbers';
/**
 * Defines a data enum using discriminated union types.
 *
 * @example
 * ```ts
 * type WebPageEvent =
 *   | { __kind: 'pageview', url: string }
 *   | { __kind: 'click', x: number, y: number };
 * ```
 *
 * @category Serializers
 */
export type DataEnum = {
    __kind: string;
};
/**
 * Extracts a variant from a data enum.
 *
 * @example
 * ```ts
 * type WebPageEvent =
 *   | { __kind: 'pageview', url: string }
 *   | { __kind: 'click', x: number, y: number };
 * type ClickEvent = GetDataEnumKind<WebPageEvent, 'click'>;
 * // -> { __kind: 'click', x: number, y: number }
 * ```
 *
 * @category Serializers
 */
export type GetDataEnumKind<T extends DataEnum, K extends T['__kind']> = Extract<T, {
    __kind: K;
}>;
/**
 * Extracts a variant from a data enum without its discriminator.
 *
 * @example
 * ```ts
 * type WebPageEvent =
 *   | { __kind: 'pageview', url: string }
 *   | { __kind: 'click', x: number, y: number };
 * type ClickEvent = GetDataEnumKindContent<WebPageEvent, 'click'>;
 * // -> { x: number, y: number }
 * ```
 *
 * @category Serializers
 */
export type GetDataEnumKindContent<T extends DataEnum, K extends T['__kind']> = Omit<Extract<T, {
    __kind: K;
}>, '__kind'>;
/**
 * Get the name and serializer of each variant in a data enum.
 * @category Serializers
 */
export type DataEnumToSerializerTuple<T extends DataEnum, U extends T> = Array<T extends any ? [
    T['__kind'],
    keyof Omit<T, '__kind'> extends never ? Serializer<Omit<T, '__kind'>, Omit<U, '__kind'>> | Serializer<void> : Serializer<Omit<T, '__kind'>, Omit<U, '__kind'>>
] : never>;
/**
 * Defines the options for data enum serializers.
 * @category Serializers
 */
export type DataEnumSerializerOptions = BaseSerializerOptions & {
    /**
     * The serializer to use for the enum discriminator prefixing the variant.
     * @defaultValue `u8()`
     */
    size?: NumberSerializer;
};
/**
 * Creates a data enum serializer.
 *
 * @param variants - The variant serializers of the data enum.
 * @param options - A set of options for the serializer.
 * @category Serializers
 */
export declare function dataEnum<T extends DataEnum, U extends T = T>(variants: DataEnumToSerializerTuple<T, U>, options?: DataEnumSerializerOptions): Serializer<T, U>;
