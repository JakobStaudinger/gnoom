import { AnyObject } from '../../../types/object';
import { Overload, OverloadTransformation } from '../../../types/overload';
import { Primitive } from '../../../types/primitive';

export interface $reverseArray {
  $reverseArray: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output: (array: this['T'][]) => this['T'][];
}
