import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { EmptyObject } from '../types/object';

export interface DocumentsStage {
  $documents: <const S extends DocumentsSpecification>(
    specification: S
  ) => Aggregate<DocumentsOutput<S>>;
}

type DocumentsSpecification = AggregateExpression<EmptyObject, unknown[]>;

type DocumentsOutput<S extends DocumentsSpecification> =
  EvaluateAggregateExpression<EmptyObject, S> extends (infer T extends object)[]
    ? T
    : never;
