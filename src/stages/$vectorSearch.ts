import { Aggregate } from '../aggregate';
import { EvaluateQueryPredicate, QueryPredicate } from '../query-predicates';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { Simplify } from '../types/simplify';

export interface $vectorSearch<State extends AggregateState> {
  $vectorSearch: MustBeFirstStage<
    State,
    <const S extends Specification<State>>(
      specification: S
    ) => Aggregate<Simplify<Output<State, S>>>
  >;
}

type Specification<State extends AggregateState> = (
  | { exact: true }
  | { exact?: false; numCandidates: number }
) & {
  index: string;
  limit: number;
  path: DeepKeyof<State['T']>;
  filter?: QueryPredicate<State>;
  searchNodePreference?: {
    key: string;
  };
} & (
    | {
        query?: {
          text: string;
        };
        model?:
          | 'voyage-4-large'
          | 'voyage-4'
          | 'voyage-4-lite'
          | 'voyage-code-3';
      }
    | { queryVector?: number[] }
  );

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: S['filter'] extends QueryPredicate<State>
      ? EvaluateQueryPredicate<State, S['filter']>
      : State['T'];
  }
>;
