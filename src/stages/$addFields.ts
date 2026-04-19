import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  UnconstrainedAggregateExpression
} from '../expressions';

export interface AddFieldsStage<T extends object> {
  $addFields: AddFieldsStageDefinition<T>;
  $set: AddFieldsStageDefinition<T>;
}

type AddFieldsStageDefinition<T extends object> = <
  const S extends AddFieldsSpecification<T>
>(
  specification: S
) => Aggregate<AddFieldsOutput<T, S>>;

export type AddFieldsSpecification<T extends object> = {
  [K in string]: UnconstrainedAggregateExpression<T>;
};

export type AddFieldsOutput<
  T extends object,
  S extends AddFieldsSpecification<T>
> = Omit<T, keyof S> & {
  -readonly [K in keyof S]: EvaluateAggregateExpression<T, S[K]>;
};
