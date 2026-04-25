import { ObjectId } from 'mongodb';

export type ConvertibleTypeIdentifier =
  | 'double'
  | 'string'
  | 'binData'
  | 'objectId'
  | 'bool'
  | 'date'
  | 'int'
  | 'long'
  | 'decimal';

export type TypeIdentifier =
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

export type IdentifierToTypeMapping = {
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

export type IdentifierToType<T extends ConvertibleTypeIdentifier> =
  IdentifierToTypeMapping[T];

export type Subtype = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 128;

export type ByteOrder = 'little' | 'big';
export type BinaryFormat = 'base64' | 'base64url' | 'utf8' | 'hex' | 'uuid';
