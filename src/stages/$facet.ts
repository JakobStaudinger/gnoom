import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { PipelineCallback } from '../types/pipeline';

export interface FacetStage<T extends object> {
  $facet: <const S extends FacetSpecification<T>>(
    specification: S
  ) => Aggregate<FacetOutput<T, S>>;
}

export type FacetSpecification<T extends object> = {
  [K in string]: PipelineCallback<T>;
};

type FacetOutput<T extends object, S extends FacetSpecification<T>> = {
  -readonly [K in keyof S]: S[K] extends (
    ...args: infer _Args
  ) => AggregateLike<infer Output>
    ? Output[]
    : never;
};
