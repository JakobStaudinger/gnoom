import { Aggregate } from '../aggregate';
import { SearchCollectors } from '../search/collectors';
import { SearchOperators } from '../search/operators';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { SortSpecification } from './$sort';

export interface $search<State extends AggregateState> {
  $search: MustBeFirstStage<
    State,
    <const S extends Specification<State>>(
      specification: S
    ) => Aggregate<Output<State, S>>
  >;
}

type Specification<State extends AggregateState> = {
  index?: string;
  concurrent?: boolean;
  returnStoredSource?: boolean;
  searchAfter?: string;
  searchBefore?: string;
  scoreDetails?: boolean;
  highlight?: {
    path:
      | DeepKeyof<State['T']>
      | { value: string; multi: string }
      | (DeepKeyof<State['T']> | { value: string; multi: string })[]
      | { wildcard: string };
    maxCharsToExamine?: number;
    maxNumPassages?: number;
  };
  count?:
    | { type: 'total' }
    | {
        type?: 'lowerBound';
        threshold?: number;
      };
  sort?: SortSpecification<State>;
  searchNodePreference?: {
    key: string;
  };
} & (
  | {
      returnScope?: {
        path: DeepKeyof<State['T']>;
      };
      returnStoredSource: true;
    }
  | { returnStoredSource?: false }
) &
  Partial<SearchCollectors<State>> &
  Partial<SearchOperators<State>>;

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: State['T'];
    systemVariables: State['systemVariables'] & {
      SEARCH_META: SearchMeta<State, S>;
    };
  }
>;

type SearchMeta<
  State extends AggregateState,
  S extends Specification<State>
> = never;
