import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';

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

type EmptyObject = Record<string, never>;
