'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umiSerializersCore = require('@metaplex-foundation/umi-serializers-core');
var baseXReslice = require('./baseXReslice.cjs');

/**
 * A string serializer that uses base64 encoding.
 * @category Serializers
 */
const base64 = umiSerializersCore.mapSerializer(baseXReslice.baseXReslice('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', 6), value => value.replace(/=/g, ''), value => value.padEnd(Math.ceil(value.length / 4) * 4, '='));

exports.base64 = base64;
//# sourceMappingURL=base64.cjs.map
