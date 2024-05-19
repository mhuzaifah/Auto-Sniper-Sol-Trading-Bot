import { Serializer } from './common';
/**
 * Converts a serializer A to a serializer B by mapping their values.
 * @category Serializers
 */
export declare function mapSerializer<NewFrom, OldFrom, To extends NewFrom & OldFrom>(serializer: Serializer<OldFrom, To>, unmap: (value: NewFrom) => OldFrom): Serializer<NewFrom, To>;
export declare function mapSerializer<NewFrom, OldFrom, NewTo extends NewFrom = NewFrom, OldTo extends OldFrom = OldFrom>(serializer: Serializer<OldFrom, OldTo>, unmap: (value: NewFrom) => OldFrom, map: (value: OldTo, buffer: Uint8Array, offset: number) => NewTo): Serializer<NewFrom, NewTo>;
