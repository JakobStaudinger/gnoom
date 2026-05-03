import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';
import { Merge } from '../types/merge';
import {
  EvaluateWindowOperatorExpression,
  WindowOperatorExpression
} from '../window-operators';
import { SortSpecification } from './$sort';

export interface $setWindowFields<State extends AggregateState> {
  $setWindowFields: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

interface Specification<State extends AggregateState> {
  partitionBy?: AggregateExpression<State>;
  sortBy?: SortSpecification<State>;
  output: Record<string, WindowOperatorExpression<State>>;
}

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<
  State,
  Merge<
    State['T'],
    {
      -readonly [K in keyof S['output']]: EvaluateWindowOperatorExpression<
        State,
        S['output'][K]
      >;
    }
  >
>;
