import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  UnconstrainedAggregateExpression
} from '../expressions';
import { EmptyObject } from '../types/object';

export interface DocumentsStage {
  $documents: <const S extends DocumentsSpecification>(
    specification: S
  ) => Aggregate<DocumentsOutput<S>>;
}

type DocumentsSpecification = UnconstrainedAggregateExpression<EmptyObject>;

type DocumentsOutput<S extends DocumentsSpecification> =
  EvaluateAggregateExpression<EmptyObject, S> extends (infer T extends object)[]
    ? T
    : never;
