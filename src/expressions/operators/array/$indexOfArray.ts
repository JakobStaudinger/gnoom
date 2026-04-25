import { AnyObject } from '../../../types/object';
import { Overload, OverloadTransformation } from '../../../types/overload';
import { Primitive } from '../../../types/primitive';

export interface $indexOfArray {
  $indexOfArray: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output: (
    haystack: this['T'][],
    needle: this['T'],
    start?: number,
    end?: number
  ) => number;
}
