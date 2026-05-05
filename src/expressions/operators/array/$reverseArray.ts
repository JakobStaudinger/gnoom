import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';

export interface $reverseArray {
  $reverseArray: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (array: this['T'][]) => this['T'][];
}
