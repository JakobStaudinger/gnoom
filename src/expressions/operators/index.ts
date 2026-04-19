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

export type OperatorExpressions<
  T extends object,
  MaxDepth extends unknown[]
> = Partial<TypeScriptToMongoSyntax<T, OperatorMap, MaxDepth>>;

export type EvaluateOperator<T extends object, S> = {
  [K in keyof S & string]: K extends keyof OperatorMap
    ? OperatorMap[K] extends infer Op
      ? MongoParametersToTypeScriptSyntax<T, S[K]> extends infer Args
        ? Args extends unknown[]
          ? Op extends (...args: Args) => infer R
            ? ((...args: ExtractRequired<Args>) => never) extends Op
              ? R
              : never
            : never
          : never
        : never
      : never
    : never;
}[keyof S & string];

type ExtractRequired<
  Arr extends readonly unknown[],
  Acc extends unknown[] = []
> = Arr extends readonly [infer _Head, ...infer Tail]
  ? ExtractRequired<Tail, [...Acc, unknown]>
  : Acc;
