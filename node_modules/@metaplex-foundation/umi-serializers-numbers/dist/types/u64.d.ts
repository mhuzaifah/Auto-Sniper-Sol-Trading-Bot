import { Serializer } from '@metaplex-foundation/umi-serializers-core';
import { NumberSerializerOptions } from './common';
export declare const u64: (options?: NumberSerializerOptions) => Serializer<number | bigint, bigint>;
