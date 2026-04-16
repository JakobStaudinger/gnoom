import { AnyObject } from '../types/object';
import {
  EvaluateFieldPathExpression,
  FieldPathExpression
} from './field-path.expression';
import { LiteralExpression } from './literal.expression';
import {
  MapOperatorParameters,
  MapToOperatorSyntax
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

type OperatorExpressions<T extends object, EvaluateTo> = MapToOperatorSyntax<
  T,
  EvaluateTo,
  Operators
>;

export type AggregateExpression<T extends object, EvaluateTo> =
  | OperatorExpressions<T, EvaluateTo>
  | LiteralExpression<EvaluateTo>
  | FieldPathExpression<T, EvaluateTo>;

export type EvaluateAggregateExpression<
  T extends object,
  S
> = S extends `$${infer Path}`
  ? EvaluateFieldPathExpression<T, Path>
  : S extends OperatorExpressions<T, unknown>
    ? EvaluateOperator<T, S, OperatorMap>
    : Exclude<keyof S, `$${string}`> extends never
      ? never
      : S extends AnyObject
        ? { -readonly [K in keyof S]: EvaluateAggregateExpression<T, S[K]> }
        : S;

type EvaluateOperator<T extends object, S, Operators> = {
  [K in keyof Operators]: K extends keyof S
    ? Operators[K] extends infer Op
      ? Op extends (...args: infer Args) => infer R
        ? S[K] extends MapOperatorParameters<T, Args>
          ? R
          : never
        : never
      : never
    : never;
}[keyof Operators];
