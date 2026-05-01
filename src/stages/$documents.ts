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

export interface DocumentsStage<State extends AggregateState> {
  $documents: MustBeFirstStage<
    State,
    <const S extends DocumentsSpecification<State>>(
      specification: S
    ) => Aggregate<DocumentsOutput<State, S>>
  >;
}

type DocumentsSpecification<State extends AggregateState> = AggregateExpression<
  WithType<State, EmptyObject>
>;

type DocumentsOutput<
  State extends AggregateState,
  S extends DocumentsSpecification<State>
> = WithType<
  State,
  EvaluateAggregateExpression<
    WithType<State, EmptyObject>,
    S
  > extends (infer T extends object)[]
    ? T
    : never
>;
