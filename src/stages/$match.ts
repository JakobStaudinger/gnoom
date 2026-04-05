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

type Narrow<T, S> =
  S extends QueryPredicate<T>
    ? S extends { $eq: infer V }
      ? V
      : S extends { $ne: infer V }
        ? Exclude<T, V>
        : S extends { $in: (infer V)[] }
          ? V
          : S extends { $nin: (infer V)[] }
            ? Exclude<T, V>
            : T
    : S extends T
      ? S
      : T;

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
