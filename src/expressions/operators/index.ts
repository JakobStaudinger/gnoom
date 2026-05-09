import { AggregateState } from '../../types/aggregate-state';
import { GnoomError } from '../../types/error';
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
  [K in keyof Input & string]: EvaluateErrors<
    EvaluateOperatorHelper<State, Input, K>
  >;
}[keyof Input & string];

type EvaluateErrors<T> = [Exclude<T, GnoomError<{ message: string }>>] extends [
  never
]
  ? T extends GnoomError<infer E>
    ? GnoomError<E>
    : never
  : Exclude<T, GnoomError<{ message: string }>>;

type EvaluateOperatorHelper<
  State extends AggregateState,
  Input,
  K extends keyof Input & string
> = K extends keyof Operators
  ? Operators[K] extends infer Op
    ? MongoParametersToTypeScriptSyntax<State, Input[K]> extends infer Args
      ? Args extends unknown[]
        ? Op extends (...args: Args) => infer R
          ? ((...args: ExtractRequired<Args>) => never) extends Op
            ? R
            : GnoomError<{
                message: 'Too many arguments passed to operator';
                operator: K;
                signature: Op;
                arguments: Args;
              }>
          : GnoomError<{
              message: 'Invalid arguments passed to operator';
              operator: K;
              signature: Op;
              arguments: Args;
            }>
        : never
      : never
    : never
  : GnoomError<{
      message: 'Unknown operator';
      operator: K;
    }>;

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
