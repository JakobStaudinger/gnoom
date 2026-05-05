import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';
import { AggregateState } from '../types/aggregate-state';
import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../types/overload';

export interface $bottom<State extends AggregateState> {
  $bottom: Overload<UnknownOverloaded, Signature<State>>;
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
