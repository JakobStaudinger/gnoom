import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { Merge } from '../types/merge';

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
  [K in string]: AggregateExpression<T>;
};

export type AddFieldsOutput<
  T extends object,
  S extends AddFieldsSpecification<T>
> = Merge<
  T,
  { -readonly [K in keyof S]: EvaluateAggregateExpression<T, S[K]> }
>;
