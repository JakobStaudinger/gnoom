import { Aggregate } from '../aggregate';
import { QueryPredicate } from '../query-predicates';

export type MatchSpecification<T extends object> = {
  [K in keyof T]?: QueryPredicate<T[K]>;
} & {
  $expr?: unknown;
  $jsonSchema?: unknown;
  $and?: MatchSpecification<T>[];
  $or?: MatchSpecification<T>[];
  $nor?: MatchSpecification<T>[];
};

type NarrowEq<T, S> = S extends { $eq: infer V } ? V : never;
type NarrowNe<T, S> = S extends { $ne: infer V } ? Exclude<T, V> : never;
type NarrowIn<T, S> = S extends { $in: (infer V)[] } ? V : never;
type NarrowNin<T, S> = S extends { $nin: (infer V)[] } ? Exclude<T, V> : never;

type NarrowHelper<T, S> =
  | NarrowEq<T, S>
  | NarrowNe<T, S>
  | NarrowIn<T, S>
  | NarrowNin<T, S>;

type Narrow<T, S> = NarrowHelper<T, S> extends never ? T : NarrowHelper<T, S>;

type MatchOutput<T extends object, S extends MatchSpecification<T>> = {
  [K in keyof T]: Narrow<T[K], S[K]>;
};

type EnforceSpecification<S, T extends object> = {
  [K in keyof S]: K extends keyof MatchSpecification<T> ? S[K] : never;
};

export type MatchStage<T extends object> = <
  const S extends MatchSpecification<T>
>(
  specification: EnforceSpecification<S, T>
) => Aggregate<MatchOutput<T, S>>;
