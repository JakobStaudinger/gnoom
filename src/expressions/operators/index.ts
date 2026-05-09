import { AggregateState } from '../../types/aggregate-state';
import { EvaluateFunctionLikeExpression } from '../../types/evaluate';
import { TypeScriptToMongoSyntax } from '../../types/map-syntax';
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

export type EvaluateOperator<
  State extends AggregateState,
  Input
> = EvaluateFunctionLikeExpression<State, Input, Operators, 'operator'>;

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
