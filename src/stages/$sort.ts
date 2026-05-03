import { Aggregate } from '../aggregate';
import { AggregateState } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';

export interface $sort<State extends AggregateState> {
  $sort: <const S extends SortSpecification<State>>(
    specification: S
  ) => Aggregate<State>;
}

export type SortSpecification<State extends AggregateState> = {
  [K in DeepKeyof<State['T']>]?: 1 | -1 | { $meta: 'textScore' };
};
