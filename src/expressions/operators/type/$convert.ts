import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';
import {
  BinaryFormat,
  ByteOrder,
  ConvertibleTypeIdentifier,
  IdentifierToType,
  Subtype
} from './types';

export interface $convert {
  $convert: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: unknown;
      to:
        | ConvertibleTypeIdentifier
        | { type: ConvertibleTypeIdentifier; subtype?: Subtype };
      byteOrder?: ByteOrder;
      format?: BinaryFormat;
      onError?: unknown;
      onNull?: unknown;
    }>
  ];
  return:
    | IdentifierToType<
        this['arguments'][0]['to'] extends
          | { type: infer T extends ConvertibleTypeIdentifier }
          | (infer T extends ConvertibleTypeIdentifier)
          ? T
          : never
      >
    | this['arguments'][0]['onError']
    | this['arguments'][0]['onNull'];
}
