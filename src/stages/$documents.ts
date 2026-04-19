import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { EmptyObject } from '../types/object';

export interface DocumentsStage {
  $documents: <const S extends DocumentsSpecification>(
    specification: S
  ) => Aggregate<DocumentsOutput<S>>;
}

type DocumentsSpecification = AggregateExpression<EmptyObject>;

type DocumentsOutput<S extends DocumentsSpecification> =
  EvaluateAggregateExpression<EmptyObject, S> extends (infer T extends object)[]
    ? T
    : never;
