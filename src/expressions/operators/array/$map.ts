import { AnyObject } from '../../../types/object';
import { Overload, OverloadTransformation } from '../../../types/overload';
import { Primitive } from '../../../types/primitive';
import { StaticInput } from '../../static-input';

export interface $map {
  $map: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output: (input: Input<unknown, this['T']>) => this['T'][];
}

type Input<I, O> = StaticInput<{ input: I[]; as?: string; in: O }>;
