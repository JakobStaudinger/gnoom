import { ObjectId } from 'mongodb';
import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { QueryPredicate } from '../query-predicates';
import { DeepKeyof, DeepType } from '../types/deep';
import { AnyObject } from '../types/object';
import { Primitive } from '../types/primitive';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface MatchStage<State extends AggregateState> {
  $match: <const S extends MatchSpecification<State>>(
    specification: S
  ) => Aggregate<MatchOutput<State, S>>;
}

type MatchSpecification<State extends AggregateState> = QueryPredicates<
  State['T']
> & {
  $expr?: AggregateExpression<State>;
  $sampleRate?: number;
  $jsonSchema?: unknown;
  $and?: MatchSpecification<State>[];
  $or?: MatchSpecification<State>[];
  $nor?: MatchSpecification<State>[];
};

type MatchOutput<
  State extends AggregateState,
  S extends MatchSpecification<State>
> = WithType<State, MatchOutputHelper<State, S>>;

type MatchOutputHelper<
  State extends AggregateState,
  S extends MatchSpecification<State>
> = {
  [K in keyof State['T']]: K extends keyof S
    ? Narrow<State['T'][K], S[K]>
    : State['T'][K];
} & NarrowOr<State, S> &
  NarrowAnd<State, S>;

type QueryPredicates<T extends object> = {
  [K in DeepKeyof<T>]?: DeepType<T, K> extends Primitive
    ? QueryPredicate<DeepType<T, K>>
    : DeepType<T, K> extends AnyObject
      ? {
          [P in keyof DeepType<T, K>]?:
            | QueryPredicate<DeepType<T, K>[P]>
            | (DeepType<T, K>[P] extends object
                ? QueryPredicates<DeepType<T, K>[P]>
                : never);
        }
      : QueryPredicate<DeepType<T, K>>;
};

type Narrow<T, S> = unknown extends NarrowHelper<T, S> ? T : NarrowHelper<T, S>;

type NarrowHelper<T, S> = NarrowLiteral<T, S> &
  NarrowEq<T, S> &
  NarrowNe<T, S> &
  NarrowIn<T, S> &
  NarrowNin<T, S> &
  NarrowType<T, S> &
  NarrowNot<T, S>;

type NarrowLiteral<T, S> = S extends T ? S : unknown;
type NarrowEq<_T, S> = S extends { $eq: infer V } ? V : unknown;
type NarrowNe<T, S> = S extends { $ne: infer V } ? Exclude<T, V> : unknown;
type NarrowIn<_T, S> = S extends { $in: (infer V)[] } ? V : unknown;
type NarrowNin<T, S> = S extends { $nin: (infer V)[] }
  ? Exclude<T, V>
  : unknown;
type NarrowType<_T, S> = S extends { $type: infer Type }
  ? TypeMap[Type & keyof TypeMap]
  : unknown;
type NarrowNot<T, S> = S extends { $not: infer Predicate }
  ? NarrowHelper<T, Negate<Predicate>>
  : unknown;

type TypeMap = {
  number: number;
  string: string;
  symbol: symbol;
  undefined: undefined;
  object: object;
  double: number;
  array: unknown[];
  objectId: ObjectId;
  bool: boolean;
  date: Date;
  null: null;
  regex: RegExp;
  int: number;
  long: number;
  decimal: number;
};

type Negate<T> = {
  [K in keyof T as NegateMap[K & keyof NegateMap]]: T[K];
};

type NegateMap = {
  $in: '$nin';
  $nin: '$in';
  $eq: '$ne';
  $ne: '$eq';
  $lt: '$gte';
  $gt: '$lte';
  $lte: '$gt';
  $gte: '$lt';
};

type NarrowOr<State extends AggregateState, S> = S extends { $or: infer Spec }
  ? NarrowOrHelper<State, Spec> extends never
    ? unknown
    : NarrowOrHelper<State, Spec>
  : unknown;

type NarrowOrHelper<State extends AggregateState, E> = E extends [
  infer Head extends MatchSpecification<State>,
  ...infer Tail
]
  ? MatchOutputHelper<State, Head> | NarrowOrHelper<State, Tail>
  : never;

type NarrowAnd<State extends AggregateState, S> = S extends { $and: infer Spec }
  ? NarrowAndHelper<State, Spec>
  : unknown;

type NarrowAndHelper<State extends AggregateState, E> = E extends [
  infer Head extends MatchSpecification<State>,
  ...infer Tail
]
  ? MatchOutputHelper<State, Head> & NarrowAndHelper<State, Tail>
  : unknown;
