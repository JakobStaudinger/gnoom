import { Aggregate } from '../aggregate';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';

export interface $sort<State extends AggregateState> {
  $sort: <const S extends SortSpecification<State>>(
    specification: S
  ) => Aggregate<Output<State>>;
}

export type SortSpecification<State extends AggregateState> = {
  [K in DeepKeyof<State['T']>]?: 1 | -1 | { $meta: 'textScore' };
};

type Output<State extends AggregateState> = AddStage<State, object>;
