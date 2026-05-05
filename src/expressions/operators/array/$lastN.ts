import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';
import { StaticInput } from '../../static-input';

export interface $lastN {
  $lastN: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (input: Input<this['T']>) => this['T'][];
}

type Input<T> = StaticInput<{ input: T[]; n: number }>;
