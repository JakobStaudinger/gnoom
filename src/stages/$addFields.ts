import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';
import { Merge } from '../types/merge';

export interface AddFieldsStage<State extends AggregateState> {
  $addFields: AddFieldsStageDefinition<State>;
  $set: AddFieldsStageDefinition<State>;
}

type AddFieldsStageDefinition<State extends AggregateState> = <
  const S extends AddFieldsSpecification<State>
>(
  specification: S
) => Aggregate<AddFieldsOutput<State, S>>;

type AddFieldsSpecification<State extends AggregateState> = {
  [K in string]: AggregateExpression<State>;
};

type AddFieldsOutput<
  State extends AggregateState,
  S extends AddFieldsSpecification<State>
> = WithType<
  State,
  Merge<
    State['T'],
    { -readonly [K in keyof S]: EvaluateAggregateExpression<State, S[K]> }
  >
>;
