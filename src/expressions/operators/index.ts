import { AggregateState } from '../../types/aggregate-state';
import {
  MongoParametersToTypeScriptSyntax,
  TypeScriptToMongoSyntax
} from '../map-syntax';
import { ArithmeticOperators } from './arithmetic';
import { ArrayOperators } from './array';
import { BitwiseOperators } from './bitwise';
import { BooleanOperators } from './boolean';
import { ComparisonOperators } from './comparison';
import { ConditionalOperators } from './conditional';
import { DataSizeOperators } from './data-size';
import { DateOperators } from './date';
import { EncryptedStringOperators } from './encrypted-string';
import { GroupOperators } from './group';
import { LiteralExpressionOperators } from './literal-expression';
import { MiscellaneousOperators } from './miscellaneous';
import { ObjectOperators } from './object';
import { SetOperators } from './set';
import { StringOperators } from './string';
import { TextOperators } from './text';
import { TimestampOperators } from './timestamp';
import { TrigonometryOperators } from './trigonometry';
import { TypeOperators } from './type';
import { VariableOperators } from './variable';

export type OperatorExpressions<
  State extends AggregateState,
  MaxDepth extends unknown[]
> = Partial<TypeScriptToMongoSyntax<State, Operators, MaxDepth>>;

export type EvaluateOperator<State extends AggregateState, Input> = {
  [K in keyof Input & string]: K extends keyof Operators
    ? Operators[K] extends infer Op
      ? MongoParametersToTypeScriptSyntax<State, Input[K]> extends infer Args
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

interface Operators
  extends
    ArithmeticOperators,
    ArrayOperators,
    BitwiseOperators,
    BooleanOperators,
    ComparisonOperators,
    ConditionalOperators,
    DataSizeOperators,
    DateOperators,
    GroupOperators,
    LiteralExpressionOperators,
    MiscellaneousOperators,
    ObjectOperators,
    SetOperators,
    StringOperators,
    EncryptedStringOperators,
    TextOperators,
    TimestampOperators,
    TrigonometryOperators,
    TypeOperators,
    VariableOperators {}

type ExtractRequired<
  Arr extends readonly unknown[],
  Acc extends unknown[] = []
> = Arr extends readonly [infer _Head, ...infer Tail]
  ? ExtractRequired<Tail, [...Acc, unknown]>
  : Acc;
