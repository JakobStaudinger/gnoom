import { StaticInput } from '../expressions/static-input';
import { AnyObject } from '../types/object';
import { Overload, OverloadTransformation } from '../types/overload';
import { Primitive } from '../types/primitive';

export interface $shift {
  $shift: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output: (input: Input<this['T']>) => this['T'];
}

type Input<V> = StaticInput<{
  output: V;
  by: StaticInput<number>;
  default?: V;
}>;
