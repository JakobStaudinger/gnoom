import { ObjectId } from 'mongodb';
import { AggregateExpression } from '../expressions';
import { AggregateState } from '../types/aggregate-state';
import { DeepKeyof, DeepType } from '../types/deep';
import { ArrayOperators } from './array';
import { BitwiseOperators } from './bitwise';
import { ComparisonOperators } from './comparison';
import { DataTypeOperators } from './data-type';
import { GeospatialOperators } from './geospatial';
import { LogicalOperators } from './logical';
import { MiscellaneousOperators } from './miscellaneous';
import { Primitive } from '../types/primitive';

export type QueryPredicate<State extends AggregateState> = {
  [K in DeepKeyof<State['T']>]?: QueryOperator<DeepType<State['T'], K>>;
} & {
  $expr?: AggregateExpression<State>;
  $and?: QueryPredicate<State>[];
  $or?: QueryPredicate<State>[];
  $nor?: QueryPredicate<State>[];
};

export type NestedQueryPredicate<T> = T extends Primitive | null | undefined
  ? Exclude<QueryOperator<T>, Value<T>>
  : T extends object
    ? {
        [K in DeepKeyof<T>]?: QueryOperator<DeepType<T, K>>;
      } & {
        $and?: NestedQueryPredicate<T>[];
        $or?: NestedQueryPredicate<T>[];
        $nor?: NestedQueryPredicate<T>[];
      }
    : never;

export type QueryOperator<T> =
  | Value<WidenNull<T>>
  | Partial<QueryOperators<WidenNull<T>>>;

interface QueryOperators<T>
  extends
    ArrayOperators<T>,
    BitwiseOperators,
    ComparisonOperators<T>,
    DataTypeOperators,
    GeospatialOperators,
    LogicalOperators<T>,
    MiscellaneousOperators<T> {}

type Value<T> = T | (T extends (infer E)[] ? QueryOperator<E> : never);

export type EvaluateQueryPredicate<
  State extends AggregateState,
  P extends QueryPredicate<State>
> = NarrowProperties<State['T'], P> & NarrowOr<State, P> & NarrowAnd<State, P>;

type NarrowProperties<T, P> = {
  [K in keyof T as K extends keyof P
    ? undefined extends Narrow<T[K], P[K]>
      ? K
      : never
    : K]: K extends keyof P ? Narrow<T[K], P[K]> : T[K];
} & {
  [K in keyof T as K extends keyof P
    ? undefined extends Narrow<T[K], P[K]>
      ? never
      : K
    : never]-?: K extends keyof P ? Narrow<T[K], P[K]> : T[K];
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
type NarrowEq<T, S> = S extends { $eq: infer V } ? T & WidenNull<V> : unknown;
type NarrowNe<T, S> = S extends { $ne: infer V }
  ? Exclude<T, WidenNull<V>>
  : unknown;
type NarrowIn<T, S> = S extends { $in: (infer V)[] }
  ? T & WidenNull<V>
  : unknown;
type NarrowNin<T, S> = S extends { $nin: (infer V)[] }
  ? Exclude<T, WidenNull<V>>
  : unknown;
type NarrowType<_T, S> = S extends { $type: infer Type }
  ? TypeMap[Type & keyof TypeMap]
  : unknown;
type NarrowNot<T, S> = S extends { $not: infer Predicate }
  ? NarrowHelper<T, Negate<Predicate>>
  : unknown;

type WidenNull<T> = null extends T
  ? T | null | undefined
  : undefined extends T
    ? T | null | undefined
    : T;

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

type NarrowOr<State extends AggregateState, P> = P extends { $or: infer Spec }
  ? NarrowOrHelper<State, Spec> extends never
    ? unknown
    : NarrowOrHelper<State, Spec>
  : unknown;

type NarrowOrHelper<State extends AggregateState, E> = E extends [
  infer Head extends QueryPredicate<State>,
  ...infer Tail
]
  ? EvaluateQueryPredicate<State, Head> | NarrowOrHelper<State, Tail>
  : never;

type NarrowAnd<State extends AggregateState, S> = S extends { $and: infer Spec }
  ? NarrowAndHelper<State, Spec>
  : unknown;

type NarrowAndHelper<State extends AggregateState, E> = E extends [
  infer Head extends QueryPredicate<State>,
  ...infer Tail
]
  ? EvaluateQueryPredicate<State, Head> & NarrowAndHelper<State, Tail>
  : unknown;
