import { Serializer as _Serializer, NumberSerializer as _NumberSerializer, WrapInSerializer as _WrapInSerializer, mapSerializer as _mapSerializer, fixSerializer as _fixSerializer, reverseSerializer as _reverseSerializer, StructToSerializerTuple as _StructToSerializerTuple, DataEnumToSerializerTuple as _DataEnumToSerializerTuple, Endian as _Endian, ArrayLikeSerializerSize as _ArrayLikeSerializerSize, BaseSerializerOptions as _BaseSerializerOptions, TupleSerializerOptions as _TupleSerializerOptions, ArraySerializerOptions as _ArraySerializerOptions, MapSerializerOptions as _MapSerializerOptions, SetSerializerOptions as _SetSerializerOptions, OptionSerializerOptions as _OptionSerializerOptions, NullableSerializerOptions as _NullableSerializerOptions, StructSerializerOptions as _StructSerializerOptions, ScalarEnumSerializerOptions as _ScalarEnumSerializerOptions, DataEnumSerializerOptions as _DataEnumSerializerOptions, StringSerializerOptions as _StringSerializerOptions, BoolSerializerOptions as _BoolSerializerOptions, UnitSerializerOptions as _UnitSerializerOptions, SingleByteNumberSerializerOptions as _SingleByteNumberSerializerOptions, NumberSerializerOptions as _NumberSerializerOptions, BytesSerializerOptions as _BytesSerializerOptions, PublicKeySerializerOptions as _PublicKeySerializerOptions, ScalarEnum as _ScalarEnum, DataEnum as _DataEnum, GetDataEnumKind as _GetDataEnumKind, GetDataEnumKindContent as _GetDataEnumKindContent } from '@metaplex-foundation/umi-serializers';
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type Serializer<From, To extends From = From> = _Serializer<From, To>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type NumberSerializer = _NumberSerializer;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type WrapInSerializer<From, To extends From = From> = _WrapInSerializer<From, To>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const mapSerializer: typeof _mapSerializer;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const fixSerializer: typeof _fixSerializer;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const reverseSerializer: typeof _reverseSerializer;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const mergeBytes: (bytesArr: Uint8Array[]) => Uint8Array;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const padBytes: (bytes: Uint8Array, length: number) => Uint8Array;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const fixBytes: (bytes: Uint8Array, length: number) => Uint8Array;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const utf8: _Serializer<string, string>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const baseX: (alphabet: string) => _Serializer<string, string>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const base10: _Serializer<string, string>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const base58: _Serializer<string, string>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const base64: _Serializer<string, string>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const base16: _Serializer<string, string>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const bitArray: (size: number, options?: boolean | import("@metaplex-foundation/umi-serializers").BitArraySerializerOptions | undefined) => _Serializer<boolean[], boolean[]>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const removeNullCharacters: (value: string) => string;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const padNullCharacters: (value: string, chars: number) => string;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type StructToSerializerTuple<T extends object, U extends T> = _StructToSerializerTuple<T, U>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type DataEnumToSerializerTuple<T extends _DataEnum, U extends T> = _DataEnumToSerializerTuple<T, U>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export declare const Endian: typeof _Endian;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type ArrayLikeSerializerSize = _ArrayLikeSerializerSize;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type BaseSerializerOptions = _BaseSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type TupleSerializerOptions = _TupleSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type ArraySerializerOptions = _ArraySerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type MapSerializerOptions = _MapSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type SetSerializerOptions = _SetSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type OptionSerializerOptions = _OptionSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type NullableSerializerOptions = _NullableSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type StructSerializerOptions = _StructSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type EnumSerializerOptions = _ScalarEnumSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type DataEnumSerializerOptions = _DataEnumSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type StringSerializerOptions = _StringSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type BoolSerializerOptions = _BoolSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type UnitSerializerOptions = _UnitSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type SingleByteNumberSerializerOptions = _SingleByteNumberSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type NumberSerializerOptions = _NumberSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type BytesSerializerOptions = _BytesSerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type PublicKeySerializerOptions = _PublicKeySerializerOptions;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type ScalarEnum<T> = _ScalarEnum<T>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type DataEnum = _DataEnum;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type GetDataEnumKind<T extends _DataEnum, K extends T['__kind']> = _GetDataEnumKind<T, K>;
/** @deprecated import from "@metaplex-foundation/umi/serializers" instead. */
export type GetDataEnumKindContent<T extends _DataEnum, K extends T['__kind']> = _GetDataEnumKindContent<T, K>;
