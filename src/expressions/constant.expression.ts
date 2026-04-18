import { AnyObject } from '../types/object';
import { Primitive } from '../types/primitive';

export type ConstantExpression<EvaluateTo> = unknown extends EvaluateTo
  ? AnyObject | Primitive | unknown[] | null
  : EvaluateTo;
