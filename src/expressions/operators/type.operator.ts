import { ObjectId } from 'mongodb';
import { StaticInput } from '../static-input';

type ConvertibleTypeIdentifier =
  | 'double'
  | 'string'
  | 'binData'
  | 'objectId'
  | 'bool'
  | 'date'
  | 'int'
  | 'long'
  | 'decimal';

type TypeIdentifier =
  | 'double'
  | 'string'
  | 'object'
  | 'array'
  | 'binData'
  | 'undefined'
  | 'objectId'
  | 'bool'
  | 'date'
  | 'null'
  | 'regex'
  | 'dbPointer'
  | 'javascript'
  | 'symbol'
  | 'javascriptWithScope'
  | 'int'
  | 'timestamp'
  | 'long'
  | 'decimal'
  | 'minKey'
  | 'maxKey';

type IdentifierToTypeMapping = {
  double: number;
  string: string;
  binData: unknown;
  objectId: ObjectId;
  bool: boolean;
  date: Date;
  int: number;
  long: number;
  decimal: number;
};

type IdentifierToType<T extends ConvertibleTypeIdentifier> =
  IdentifierToTypeMapping[T];

type Subtype = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 128;

type ByteOrder = 'little' | 'big';
type BinaryFormat = 'base64' | 'base64url' | 'utf8' | 'hex' | 'uuid';

export interface TypeOperatorMap {
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
  $isNumber: <T>(value: T | number) => value is number;
  $toBool: <T>(value: T) => boolean;
  $toDate: <T>(value: T) => Date;
  $toDecimal: <T>(value: T) => number;
  $toDouble: <T>(value: T) => number;
  $toInt: <T>(value: T) => number;
  $toLong: <T>(value: T) => number;
  $toObjectId: <T>(value: T) => ObjectId;
  $toString: <T>(value: T) => string;
  $type: <T>(value: T) => TypeIdentifier;
  $toUUID: <T>(value: T) => unknown;
}
