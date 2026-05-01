import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';
import { AggregateState } from '../types/aggregate-state';
import { AnyObject } from '../types/object';
import { Overload, OverloadTransformation } from '../types/overload';
import { Primitive } from '../types/primitive';

export interface $bottom<State extends AggregateState> {
  $bottom: Overload<Primitive | AnyObject | unknown[], Signature<State>>;
}

interface Signature<
  State extends AggregateState
> extends OverloadTransformation {
  output: (input: Input<State, this['T']>) => this['T'];
}

type Input<State extends AggregateState, O> = StaticInput<{
  sortBy: StaticInput<SortSpecification<State>>;
  output: O;
}>;
