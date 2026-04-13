import { AnyObject } from '../types/object';
import { Primitive } from '../types/primitive';

export type LiteralExpression<EvaluateTo> = unknown extends EvaluateTo
  ? AnyObject | Primitive | unknown[] | null
  : EvaluateTo;
