import { AnyObject } from '../types/object';
import { Overload, OverloadTransformation } from '../types/overload';
import { Primitive } from '../types/primitive';

export interface $addToSet {
  $addToSet: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output: (value: this['T']) => this['T'][];
}
