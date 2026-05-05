import { StaticInput } from '../expressions/static-input';
import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../types/overload';

export interface $shift {
  $shift: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (input: Input<this['T']>) => this['T'];
}

type Input<V> = StaticInput<{
  output: V;
  by: StaticInput<number>;
  default?: V;
}>;
