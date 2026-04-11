import { Aggregate } from '../aggregate';
import { EnforceSpecification } from './enforce-specification';
import { Primitive } from './primitive';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';

export type ProjectStage<T extends object> = {
  $project: <const S extends ProjectSpecification<T>>(
    specification: EnforceSpecification<S, ProjectSpecification<T>>
  ) => Aggregate<ProjectOutput<T, S>>;
};

export type ProjectSpecification<T extends object> = Record<
  string,
  | 1
  | true
  | 0
  | false
  | Exclude<AggregateExpression<T, Primitive | Primitive[]>, number | boolean>
>;

export type ProjectOutput<T extends object, S extends ProjectSpecification<T>> =
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
