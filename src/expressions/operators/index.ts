import {
  MongoParametersToTypeScriptSyntax,
  TypeScriptToMongoSyntax
} from '../map-syntax';
import { ArithmeticOperatorMap } from './arithmetic';
import { ArrayOperatorMap } from './array';
import { BitwiseOperatorMap } from './bitwise';
import { BooleanOperatorMap } from './boolean';
import { ComparisonOperatorMap } from './comparison';
import { ConditionalOperatorMap } from './conditional';
import { DataSizeOperatorMap } from './data-size';
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

export type OperatorExpressions<
  T extends object,
  MaxDepth extends unknown[]
> = Partial<TypeScriptToMongoSyntax<T, OperatorMap, MaxDepth>>;

export type EvaluateOperator<T extends object, Input> = {
  [K in keyof Input & string]: K extends keyof OperatorMap
    ? OperatorMap[K] extends infer Op
      ? MongoParametersToTypeScriptSyntax<T, Input[K]> extends infer Args
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
}[keyof Input & string];

interface OperatorMap
  extends
    ArithmeticOperatorMap,
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

type ExtractRequired<
  Arr extends readonly unknown[],
  Acc extends unknown[] = []
> = Arr extends readonly [infer _Head, ...infer Tail]
  ? ExtractRequired<Tail, [...Acc, unknown]>
  : Acc;
