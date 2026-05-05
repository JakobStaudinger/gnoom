import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';
import { StaticInput } from '../../static-input';

export interface $filter {
  $filter: Overload<UnknownOverloaded, Signature>;
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
