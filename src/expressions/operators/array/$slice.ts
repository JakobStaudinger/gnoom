import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';

export interface $slice {
  $slice: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output:
    | ((array: this['T'][], n: number) => this['T'][])
    | ((array: this['T'][], position: number, n: number) => this['T'][]);
}
