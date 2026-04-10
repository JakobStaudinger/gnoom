import { FieldPathExpression } from './field-path.expression';
import { LiteralExpression } from './literal.expression';
import { MapToOperatorSyntax } from './map-to-operator-syntax';
import { ArithmetricOperator } from './operators/arithmetic.operator';
import { ArrayOperator } from './operators/array.operator';
import { BitwiseOperator } from './operators/bitwise.operator';
import { BooleanOperator } from './operators/boolean.operator';
import { ComparisonOperator } from './operators/comparison.operator';
import { ConditionalOperator } from './operators/conditional.operator';
import { DataSizeOperator } from './operators/data-size.operator';
import { DateOperator } from './operators/date.operator';
import { EncryptedStringOperator } from './operators/encrypted-string.operator';
import { GroupOperator } from './operators/group.operator';
import { LiteralExpressionOperator } from './operators/literal-expression.operator';
import { MiscellaneousOperator } from './operators/miscellaneous.operator';
import { ObjectOperator } from './operators/object.operator';
import { SetOperator } from './operators/set.operator';
import { StringOperator } from './operators/string.operator';
import { TextOperator } from './operators/text.operator';
import { TimestampOperator } from './operators/timestamp.operator';
import { TrigonometryOperator } from './operators/trigonometry.operator';
import { TypeOperator } from './operators/type.operator';

type Operators =
  | ArithmetricOperator
  | ArrayOperator
  | BitwiseOperator
  | BooleanOperator
  | ComparisonOperator
  | ConditionalOperator
  | DataSizeOperator
  | DateOperator
  | GroupOperator
  | LiteralExpressionOperator
  | MiscellaneousOperator
  | ObjectOperator
  | SetOperator
  | StringOperator
  | EncryptedStringOperator
  | TextOperator
  | TimestampOperator
  | TrigonometryOperator
  | TypeOperator;

export type AggregateExpression<T extends object, EvaluateTo> =
  | MapToOperatorSyntax<T, EvaluateTo, Operators>
  | LiteralExpression<EvaluateTo>
  | FieldPathExpression<T, EvaluateTo>;
