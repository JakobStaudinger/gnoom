import { StaticInput } from '../expressions/static-input';
import { AnyObject } from '../types/object';
import { Overload, OverloadTransformation } from '../types/overload';
import { Primitive } from '../types/primitive';

export interface $firstN {
  $firstN: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output: (value: Input<this['arg']>) => this['arg'][];
}

type Input<V> = StaticInput<{ input: V; n: number }>;
