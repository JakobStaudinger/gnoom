import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';
import { StaticInput } from '../../static-input';

export interface $map {
  $map: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (input: Input<unknown, this['T']>) => this['T'][];
}

type Input<I, O> = StaticInput<{ input: I[]; as?: string; in: O }>;
