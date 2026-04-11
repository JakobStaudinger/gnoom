import { ObjectId } from 'mongodb';
import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { QueryPredicate } from '../query-predicates';

export interface MatchStage<T extends object> {
  $match: <const S extends MatchSpecification<T>>(
    specification: S
  ) => Aggregate<MatchOutput<T, S>>;
}

export type MatchSpecification<T extends object> = {
  [K in keyof T]?: QueryPredicate<T[K]>;
} & {
  $expr?: AggregateExpression<T, number | boolean | null>;
  $sampleRate?: number;
  $jsonSchema?: unknown;
  $and?: MatchSpecification<T>[];
  $or?: MatchSpecification<T>[];
  $nor?: MatchSpecification<T>[];
};

type MatchOutput<T extends object, S extends MatchSpecification<T>> = {
  [K in keyof T]: Narrow<T[K], S[K]>;
} & NarrowOr<T, S> &
  NarrowAnd<T, S>;

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

type NarrowOr<T extends object, S> = S extends { $or: infer Spec }
  ? NarrowOrHelper<T, Spec> extends never
    ? unknown
    : NarrowOrHelper<T, Spec>
  : unknown;

type NarrowOrHelper<T extends object, E> = E extends [
  infer Head extends MatchSpecification<T>,
  ...infer Tail
]
  ? MatchOutput<T, Head> | NarrowOrHelper<T, Tail>
  : never;

type NarrowAnd<T extends object, S> = S extends { $and: infer Spec }
  ? NarrowAndHelper<T, Spec>
  : unknown;

type NarrowAndHelper<T extends object, E> = E extends [
  infer Head extends MatchSpecification<T>,
  ...infer Tail
]
  ? MatchOutput<T, Head> & NarrowAndHelper<T, Tail>
  : unknown;
