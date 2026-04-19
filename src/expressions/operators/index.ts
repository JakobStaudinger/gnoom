import {
  MongoParametersToTypeScriptSyntax,
  TypeScriptToMongoSyntax
} from '../map-syntax';
import { ArithmetricOperatorMap } from './arithmetic.operator';
import { ArrayOperatorMap } from './array.operator';
import { BitwiseOperatorMap } from './bitwise.operator';
import { BooleanOperatorMap } from './boolean.operator';
import { ComparisonOperatorMap } from './comparison.operator';
import { ConditionalOperatorMap } from './conditional.operator';
import { DataSizeOperatorMap } from './data-size.operator';
import { DateOperatorMap } from './date.operator';
import { EncryptedStringOperatorMap } from './encrypted-string.operator';
import { GroupOperatorMap } from './group.operator';
import { LiteralExpressionOperatorMap } from './literal-expression.operator';
import { MiscellaneousOperatorMap } from './miscellaneous.operator';
import { ObjectOperatorMap } from './object.operator';
import { SetOperatorMap } from './set.operator';
import { StringOperatorMap } from './string.operator';
import { TextOperatorMap } from './text.operator';
import { TimestampOperatorMap } from './timestamp.operator';
import { TrigonometryOperatorMap } from './trigonometry.operator';
import { TypeOperatorMap } from './type.operator';

export interface OperatorMap
  extends
    ArithmetricOperatorMap,
    ArrayOperatorMap,
    BitwiseOperatorMap,
    BooleanOperatorMap,
    ComparisonOperatorMap,
    ConditionalOperatorMap,
    DataSizeOperatorMap,
    DateOperatorMap,
    GroupOperatorMap,
    LiteralExpressionOperatorMap,
    MiscellaneousOperatorMap,
    ObjectOperatorMap,
    SetOperatorMap,
    StringOperatorMap,
    EncryptedStringOperatorMap,
    TextOperatorMap,
    TimestampOperatorMap,
    TrigonometryOperatorMap,
    TypeOperatorMap {}

type DistributeOverloads<K extends string, V> = V extends unknown
  ? { [P in K]: V }
  : never;

type Operators = {
  [K in keyof OperatorMap]: DistributeOverloads<K, OperatorMap[K]>;
}[keyof OperatorMap];

export type OperatorExpressions<T extends object> = TypeScriptToMongoSyntax<
  T,
  Operators
>;

export type EvaluateOperator<T extends object, S, Operators> = {
  [K in keyof Operators]: K extends keyof S
    ? Operators[K] extends infer Op
      ? MongoParametersToTypeScriptSyntax<T, S[K]> extends infer Args
        ? Args extends readonly unknown[]
          ? Op extends (...args: Args) => infer R
            ? R
            : never
          : never
        : never
      : never
    : never;
}[keyof Operators];
