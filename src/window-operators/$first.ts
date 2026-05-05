import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../types/overload';

export interface $first {
  $first: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (value: this['T']) => this['T'];
}
