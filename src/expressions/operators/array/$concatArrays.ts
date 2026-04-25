import { AnyObject } from '../../../types/object';
import { Overload, OverloadTransformation } from '../../../types/overload';
import { Primitive } from '../../../types/primitive';

export interface $concatArrays {
  $concatArrays: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output: (
    array1: this['T'][],
    array2: this['T'],
    ...arrays: this['T'][][]
  ) => this['T'][];
}
