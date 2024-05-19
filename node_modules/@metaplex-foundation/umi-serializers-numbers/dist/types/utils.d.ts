import { Serializer } from '@metaplex-foundation/umi-serializers-core';
import { NumberSerializerOptions, SingleByteNumberSerializerOptions } from './common';
export declare function numberFactory(input: {
    name: string;
    size: number;
    range?: [number | bigint, number | bigint];
    set: (view: DataView, value: number | bigint, littleEndian?: boolean) => void;
    get: (view: DataView, littleEndian?: boolean) => number;
    options: SingleByteNumberSerializerOptions | NumberSerializerOptions;
}): Serializer<number>;
export declare function numberFactory(input: {
    name: string;
    size: number;
    range?: [number | bigint, number | bigint];
    set: (view: DataView, value: number | bigint, littleEndian?: boolean) => void;
    get: (view: DataView, littleEndian?: boolean) => bigint;
    options: SingleByteNumberSerializerOptions | NumberSerializerOptions;
}): Serializer<number | bigint, bigint>;
/**
 * Helper function to ensure that the array buffer is converted properly from a uint8array
 * Source: https://stackoverflow.com/questions/37228285/uint8array-to-arraybuffer
 * @param {Uint8Array} array Uint8array that's being converted into an array buffer
 * @returns {ArrayBuffer} An array buffer that's necessary to construct a data view
 */
export declare const toArrayBuffer: (array: Uint8Array) => ArrayBuffer;
export declare const toDataView: (array: Uint8Array) => DataView;
export declare const assertRange: (serializer: string, min: number | bigint, max: number | bigint, value: number | bigint) => void;
export declare const assertEnoughBytes: (serializer: string, bytes: Uint8Array, expected: number) => void;
