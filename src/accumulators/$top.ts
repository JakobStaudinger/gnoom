import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';
import { AnyObject } from '../types/object';
import { Overload, OverloadTransformation } from '../types/overload';
import { Primitive } from '../types/primitive';

export interface $top<T extends object> {
  $top: Overload<Primitive | AnyObject | unknown[], Signature<T>>;
}

interface Signature<T extends object> extends OverloadTransformation {
  output: (input: Input<T, this['arg']>) => this['arg'];
}

type Input<T extends object, O> = StaticInput<{
  sortBy: StaticInput<SortSpecification<T>>;
  output: O;
}>;
