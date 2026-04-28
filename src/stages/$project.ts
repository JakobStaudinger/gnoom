import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';

export interface ProjectStage<T extends object> {
  $project: <const S extends ProjectSpecification<T>>(
    specification: S
  ) => Aggregate<ProjectOutput<T, S>>;
}

type ProjectSpecification<T extends object> = {
  [K in keyof T]?:
    | 1
    | true
    | 0
    | false
    | Exclude<AggregateExpression<T>, number | boolean>;
};

type ProjectOutput<T extends object, S extends ProjectSpecification<T>> =
  IsPureExclusion<S> extends true
    ? Omit<T, keyof S>
    : {
        -readonly [K in keyof S as S[K] extends 0 | false
          ? never
          : K]: S[K] extends 1 | true
          ? T[K & keyof T]
          : EvaluateAggregateExpression<T, S[K]>;
      } & ('_id' extends keyof S ? unknown : { [K in keyof T & '_id']: T[K] });

type IsPureExclusion<S> = S[keyof S] extends 0 | false ? true : false;
