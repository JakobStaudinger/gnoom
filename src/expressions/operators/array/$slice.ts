import { AnyObject } from '../../../types/object';
import { Overload, OverloadTransformation } from '../../../types/overload';
import { Primitive } from '../../../types/primitive';

export interface $slice {
  $slice: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output:
    | ((array: this['T'][], n: number) => this['T'][])
    | ((array: this['T'][], position: number, n: number) => this['T'][]);
}
