import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../types/overload';

export interface $last {
  $last: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (value: this['T']) => this['T'];
}
