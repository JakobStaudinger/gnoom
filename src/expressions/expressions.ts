import { ConstantExpression, EvaluateConstant } from './constant.expression';
import {
  EvaluateFieldPathExpression,
  FieldPathExpression
} from './field-path.expression';
import {
  EvaluateOperator,
  OperatorExpressions,
  OperatorMap
} from './operators';
import { StaticInput } from './static-input';

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
