import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';
import { AggregateState } from '../types/aggregate-state';
import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../types/overload';

export interface $bottomN<State extends AggregateState> {
  $bottomN: Overload<UnknownOverloaded, Signature<State>>;
}

interface Signature<
  State extends AggregateState
> extends OverloadTransformation {
  output: (input: Input<State, this['T']>) => this['T'][];
}

type Input<State extends AggregateState, O> = StaticInput<{
  n: number;
  sortBy: StaticInput<SortSpecification<State>>;
  output: O;
}>;
