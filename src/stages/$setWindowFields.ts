import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';
import { Merge } from '../types/merge';
import {
  EvaluateWindowOperatorExpression,
  WindowOperatorExpression
} from '../window-operators';
import { SortSpecification } from './$sort';

export interface SetWindowFieldsStage<State extends AggregateState> {
  $setWindowFields: <const S extends SetWindowFieldsSpecification<State>>(
    specification: S
  ) => Aggregate<SetWindowFieldsOutput<State, S>>;
}

interface SetWindowFieldsSpecification<State extends AggregateState> {
  partitionBy?: AggregateExpression<State>;
  sortBy?: SortSpecification<State>;
  output: Record<string, WindowOperatorExpression<State>>;
}

type SetWindowFieldsOutput<
  State extends AggregateState,
  S extends SetWindowFieldsSpecification<State>
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
