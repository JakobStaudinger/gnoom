import { Overload, OverloadTransformation } from '../../../types/overload';
import { Primitive } from '../../../types/primitive';
import { StaticInput } from '../../static-input';

export interface $maxN {
  $maxN: Overload<Primitive, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (input: Input<this['T']>) => this['T'][];
}

type Input<T> = StaticInput<{ input: T[]; n: number }>;
