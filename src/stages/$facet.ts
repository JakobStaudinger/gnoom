import { Aggregate, AggregatePipeline } from '../aggregate';

export interface FacetStage<T extends object> {
  $facet: <const S extends FacetSpecification<T>>(
    specification: S
  ) => Aggregate<FacetOutput<T, S>>;
}

export type FacetSpecification<T extends object> = {
  [K in string]: (
    aggregate: Aggregate<T>
  ) => Aggregate<object> | AggregatePipeline<unknown>;
};

type FacetOutput<T extends object, S extends FacetSpecification<T>> = {
  -readonly [K in keyof S]: S[K] extends (
    ...args: infer _Args
  ) => Aggregate<infer Output> | AggregatePipeline<infer Output>
    ? Output[]
    : never;
};
