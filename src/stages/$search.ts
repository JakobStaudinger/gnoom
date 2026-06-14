import { Aggregate } from '../aggregate';
import { SearchMeta, SearchSpecification } from '../search';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';

export interface $search<State extends AggregateState> {
  $search: MustBeFirstStage<
    State,
    <const S extends SearchSpecification<State>>(
      specification: S
    ) => Aggregate<Output<State, S>>
  >;
}

type Output<
  State extends AggregateState,
  S extends SearchSpecification<State>
> = AddStage<
  State,
  {
    systemVariables: State['systemVariables'] & {
      SEARCH_META: SearchMeta<State, S>;
    };
  }
>;
