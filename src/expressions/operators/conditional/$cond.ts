import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';
import { StaticInput } from '../../static-input';

export interface $cond {
  $cond: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output:
    | ((input: Input<this['T']>) => this['T'])
    | ((_if: boolean, _then: this['T'], _else: this['T']) => this['T']);
}

type Input<T> = StaticInput<{ if: boolean; then: T; else: T }>;
