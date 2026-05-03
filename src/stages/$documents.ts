import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import {
  AggregateState,
  MustBeFirstStage,
  WithType
} from '../types/aggregate-state';
import { EmptyObject } from '../types/object';

export interface $documents<State extends AggregateState> {
  $documents: MustBeFirstStage<
    State,
    <const S extends Specification<State>>(
      specification: S
    ) => Aggregate<Output<State, S>>
  >;
}

type Specification<State extends AggregateState> = AggregateExpression<
  WithType<State, EmptyObject>
>;

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<
  State,
  EvaluateAggregateExpression<
    WithType<State, EmptyObject>,
    S
  > extends (infer T extends object)[]
    ? T
    : never
>;
