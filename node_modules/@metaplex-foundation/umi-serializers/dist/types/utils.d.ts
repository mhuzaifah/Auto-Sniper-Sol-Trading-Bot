import type { NumberSerializer } from '@metaplex-foundation/umi-serializers-numbers';
import { ArrayLikeSerializerSize } from './arrayLikeSerializerSize';
export declare function getResolvedSize(size: number | NumberSerializer, bytes: Uint8Array, offset: number): [number | bigint, number];
export declare function getSizeDescription(size: ArrayLikeSerializerSize | string): string;
export declare function getSizeFromChildren(size: ArrayLikeSerializerSize, childrenSizes: (number | null)[]): number | null;
export declare function getSizePrefix(size: ArrayLikeSerializerSize, realSize: number): Uint8Array;
