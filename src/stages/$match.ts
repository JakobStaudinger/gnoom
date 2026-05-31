import { Aggregate } from '../aggregate';
import { EvaluateQueryPredicate, QueryPredicate } from '../query-predicates';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { Simplify } from '../types/simplify';

export interface $match<State extends AggregateState> {
  $match: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Simplify<Output<State, S>>>;
}

type Specification<State extends AggregateState> = QueryPredicate<State> & {
  $sampleRate?: number;
  $jsonSchema?: unknown;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<State, { T: EvaluateQueryPredicate<State, S> }>;
