import { Aggregate } from '../aggregate';
import { SearchMeta, SearchSpecification } from '../search';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { Simplify } from '../types/simplify';

export interface $searchMeta<State extends AggregateState> {
  $searchMeta: <const S extends SearchSpecification<State>>(
    specification: S
  ) => Aggregate<Simplify<Output<State, S>>>;
}

type Output<
  State extends AggregateState,
  S extends SearchSpecification<State>
> = AddStage<State, { T: SearchMeta<State, S> }>;
