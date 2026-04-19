import { AnyObject } from '../types/object';
import { ConstantExpression } from './constant.expression';
import {
  EvaluateFieldPathExpression,
  FieldPathExpression
} from './field-path.expression';
import {
  MongoParametersToTypeScriptSyntax,
  TypeScriptToMongoSyntax
} from './map-to-operator-syntax';
import { ArithmetricOperatorMap } from './operators/arithmetic.operator';
import { ArrayOperatorMap } from './operators/array.operator';
import { BitwiseOperatorMap } from './operators/bitwise.operator';
import { BooleanOperatorMap } from './operators/boolean.operator';
import { ComparisonOperatorMap } from './operators/comparison.operator';
import { ConditionalOperatorMap } from './operators/conditional.operator';
import { DataSizeOperatorMap } from './operators/data-size.operator';
import { DateOperatorMap } from './operators/date.operator';
import { EncryptedStringOperatorMap } from './operators/encrypted-string.operator';
import { GroupOperatorMap } from './operators/group.operator';
import { LiteralExpressionOperatorMap } from './operators/literal-expression.operator';
import { MiscellaneousOperatorMap } from './operators/miscellaneous.operator';
import { ObjectOperatorMap } from './operators/object.operator';
import { SetOperatorMap } from './operators/set.operator';
import { StringOperatorMap } from './operators/string.operator';
import { TextOperatorMap } from './operators/text.operator';
import { TimestampOperatorMap } from './operators/timestamp.operator';
import { TrigonometryOperatorMap } from './operators/trigonometry.operator';
import { TypeOperatorMap } from './operators/type.operator';
import { StaticInput } from './static-input';

interface OperatorMap
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

type OperatorExpressions<T extends object> = TypeScriptToMongoSyntax<
  T,
  Operators
>;

export type AggregateExpression<T extends object> =
  | OperatorExpressions<T>
  | ConstantExpression
  | FieldPathExpression<T>;

export type EvaluateAggregateExpression<
  T extends object,
  S,
  IncludeStatic = false
> = S extends `$${infer Path}`
  ? EvaluateFieldPathExpression<T, Path>
  : S extends OperatorExpressions<T>
    ? EvaluateOperator<T, S, OperatorMap>
    : IncludeStatic extends true
      ? StaticInput<EvaluateConstant<T, S, IncludeStatic>>
      : EvaluateConstant<T, S, IncludeStatic>;

type EvaluateConstant<T extends object, S, IncludeStatic> = S extends AnyObject
  ? keyof S & `$${string}` extends never
    ? {
        -readonly [K in keyof S]: EvaluateAggregateExpression<
          T,
          S[K],
          IncludeStatic
        >;
      }
    : never
  : S;

type EvaluateOperator<T extends object, S, Operators> = {
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
