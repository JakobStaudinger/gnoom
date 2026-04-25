import { AnyObject } from '../../../types/object';
import { Overload, OverloadTransformation } from '../../../types/overload';
import { Primitive } from '../../../types/primitive';

export interface $in {
  $in: Overload<Primitive | AnyObject | unknown[], Signature>;
}

interface Signature extends OverloadTransformation {
  output: (needle: this['T'], haystack: this['T'][]) => boolean;
}
