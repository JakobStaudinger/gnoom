import { StaticInput } from '../../static-input';
import {
  BinaryFormat,
  ByteOrder,
  ConvertibleTypeIdentifier,
  IdentifierToType,
  Subtype
} from './types';

export interface $convert {
  $convert: <T, R extends ConvertibleTypeIdentifier, E = never, N = null>(
    input: StaticInput<{
      input: T;
      to: R | { type: R; subtype?: Subtype };
      byteOrder?: ByteOrder;
      format?: BinaryFormat;
      onError?: E;
      onNull?: N;
    }>
  ) => IdentifierToType<R> | N | E;
}
