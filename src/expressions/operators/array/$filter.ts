import { AnyObject } from '../../../types/object';
import { Overload, OverloadTransformation } from '../../../types/overload';
import { Primitive } from '../../../types/primitive';
import { StaticInput } from '../../static-input';

export interface $filter {
  $filter: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output: (input: Input<this['T']>) => this['T'][];
}

type Input<T> = StaticInput<{
  input: T[];
  as?: StaticInput<string>;
  cond: boolean;
  limit?: number;
}>;
