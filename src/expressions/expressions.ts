import { ArrayOfLength } from '../types/recursion';
import { ConstantExpression, EvaluateConstant } from './constant.expression';
import {
  EvaluateFieldPathExpression,
  FieldPathExpression
} from './field-path.expression';
import { EvaluateOperator, OperatorExpressions } from './operators';
import { StaticInput } from './static-input';

export type AggregateExpression<
  T extends object,
  MaxDepth extends unknown[] = ArrayOfLength<3>
> =
  | OperatorExpressions<T, MaxDepth>
  | ConstantExpression<T, MaxDepth>
  | FieldPathExpression<T>;

export type EvaluateAggregateExpression<
  T extends object,
  Expression,
  IncludeStatic = false
> = Expression extends `$${infer Path}`
  ? EvaluateFieldPathExpression<T, Path>
  : true extends HasReservedKey<Expression>
    ? EvaluateOperator<T, Expression>
    : IncludeStatic extends true
      ? StaticInput<EvaluateConstant<T, Expression, IncludeStatic>>
      : EvaluateConstant<T, Expression, IncludeStatic>;

type HasReservedKey<T> = keyof T & `$${string}` extends never ? false : true;
