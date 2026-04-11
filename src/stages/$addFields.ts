import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { Primitive } from '../types/primitive';

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
  [K in string]: AggregateExpression<T, Primitive | Primitive[]>;
};

export type AddFieldsOutput<
  T extends object,
  S extends AddFieldsSpecification<T>
> = Omit<T, keyof S> & {
  -readonly [K in keyof S]: EvaluateAggregateExpression<T, S[K]>;
};
