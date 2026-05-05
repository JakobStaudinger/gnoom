import { StaticInput } from '../expressions/static-input';
import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../types/overload';

export interface $firstN {
  $firstN: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (value: Input<this['T']>) => this['T'][];
}

type Input<V> = StaticInput<{ input: V; n: number }>;
