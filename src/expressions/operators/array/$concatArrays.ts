import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';

export interface $concatArrays {
  $concatArrays: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (
    array1: this['T'][],
    array2: this['T'],
    ...arrays: this['T'][][]
  ) => this['T'][];
}
