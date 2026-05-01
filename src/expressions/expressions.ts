import { AggregateState } from '../types/aggregate-state';
import { ArrayOfLength } from '../types/recursion';
import { ConstantExpression, EvaluateConstant } from './constant.expression';
import {
  EvaluateFieldPathExpression,
  FieldPathExpression
} from './field-path.expression';
import { EvaluateOperator, OperatorExpressions } from './operators';
import { StaticInput } from './static-input';
import {
  EvaluateVariableExpression,
  VariableExpression
} from './variable.expression';

export type AggregateExpression<
  State extends AggregateState,
  MaxDepth extends unknown[] = ArrayOfLength<3>
> =
  | OperatorExpressions<State, MaxDepth>
  | ConstantExpression<State, MaxDepth>
  | FieldPathExpression<State>
  | VariableExpression<State>;

export type EvaluateAggregateExpression<
  State extends AggregateState,
  Expression,
  IncludeStatic = false
> = Expression extends `$$${infer Path}`
  ? EvaluateVariableExpression<State, Path>
  : Expression extends `$${infer Path}`
    ? EvaluateFieldPathExpression<State, Path>
    : HasReservedKey<Expression> extends true
      ? EvaluateOperator<State, Expression>
      : IncludeStatic extends true
        ? StaticInput<EvaluateConstant<State, Expression, IncludeStatic>>
        : EvaluateConstant<State, Expression, IncludeStatic>;

type HasReservedKey<T> = keyof T & `$${string}` extends never ? false : true;
