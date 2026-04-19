import { AnyObject } from '../types/object';
import { Primitive } from '../types/primitive';

export type ConstantExpression =
  | AnyObject
  | Primitive
  | null
  | undefined
  | unknown[];
