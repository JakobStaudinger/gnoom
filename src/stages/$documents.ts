import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { GnoomError } from '../types/error';
import { Simplify } from '../types/simplify';

export interface $documents<State extends AggregateState> {
  $documents: MustBeFirstStage<
    State,
    <const S extends Specification<State>>(
      specification: S
    ) => Aggregate<Simplify<Output<State, S>>>
  >;
}

type Specification<State extends AggregateState> = AggregateExpression<State>;

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: EvaluateAggregateExpression<State, S> extends (infer T extends object)[]
      ? T
      : GnoomError<{
          message: 'Aggregate expression must resolve to an array of objects.';
        }>;
  }
>;
