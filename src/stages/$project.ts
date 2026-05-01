import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface ProjectStage<State extends AggregateState> {
  $project: <const S extends ProjectSpecification<State>>(
    specification: S
  ) => Aggregate<ProjectOutput<State, S>>;
}

type ProjectSpecification<State extends AggregateState> = {
  [K in keyof State['T']]?:
    | 1
    | true
    | 0
    | false
    | Exclude<AggregateExpression<State>, number | boolean>;
};

type ProjectOutput<
  State extends AggregateState,
  S extends ProjectSpecification<State>
> = WithType<
  State,
  IsPureExclusion<S> extends true
    ? Omit<State['T'], keyof S>
    : {
        -readonly [K in keyof S as S[K] extends 0 | false
          ? never
          : K]: S[K] extends 1 | true
          ? State['T'][K & keyof State['T']]
          : EvaluateAggregateExpression<State, S[K]>;
      } & ('_id' extends keyof S
        ? unknown
        : { [K in keyof State['T'] & '_id']: State['T'][K] })
>;

type IsPureExclusion<S> = S[keyof S] extends 0 | false ? true : false;
