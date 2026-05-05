import { AnyObject } from '../../../types/object';
import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';
import { StaticInput } from '../../static-input';

export interface $let {
  $let: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (input: Input<this['T']>) => this['T'];
}

type Input<T> = StaticInput<{ vars: StaticInput<AnyObject>; in: T }>;
