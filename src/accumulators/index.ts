import {
  MapOperatorParameters,
  MapToOperatorSyntax
} from '../expressions/map-to-operator-syntax';
import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';
import { AnyObject } from '../types/object';

interface AccumulatorMap<T extends object> {
  $addToSet: <V>(value: V) => V[];
  $avg: (value: number) => number;
  $bottom: <O>(
    input: StaticInput<{
      sortBy: StaticInput<SortSpecification<T>>;
      output: O;
    }>
  ) => O;
  $bottomN: <O>(
    input: StaticInput<{
      n: number;
      sortBy: StaticInput<SortSpecification<T>>;
      output: O;
    }>
  ) => O[];
  $count: () => number;
  $first: <V>(value: V) => V;
  $firstN: <V>(input: StaticInput<{ input: V; n: number }>) => V[];
  $last: <V>(value: V) => V;
  $lastN: <V>(input: StaticInput<{ input: V; n: number }>) => V[];
  $max: <V extends number>(value: V) => V;
  $maxN: <V extends number>(input: StaticInput<{ input: V; n: number }>) => V[];
  $median: <V extends number>(
    input: StaticInput<{ input: V; method: StaticInput<'approximate'> }>
  ) => V;
  $mergeObjects: <O extends AnyObject>(obj: O) => O;
  $min: <V extends number>(value: V) => V;
  $minN: <V extends number>(input: StaticInput<{ input: V; n: number }>) => V[];
  $percentile: <V extends number>(
    input: StaticInput<{
      input: V;
      p: number[];
      method: StaticInput<'approximate'>;
    }>
  ) => V[];
  $push: <V>(value: V) => V[];
  $stdDevPop: <V extends number>(value: V) => V;
  $stdDevSamp: <V extends number>(value: V) => V;
  $sum: <V extends number>(value: V) => V;
  $top: <O>(
    input: StaticInput<{
      sortBy: StaticInput<SortSpecification<T>>;
      output: O;
    }>
  ) => O;
  $topN: <O>(
    input: StaticInput<{
      n: number;
      sortBy: StaticInput<SortSpecification<T>>;
      output: O;
    }>
  ) => O[];
}

type Accumulators<T extends object> = {
  [K in keyof AccumulatorMap<T>]: { [P in K]: AccumulatorMap<T>[K] };
}[keyof AccumulatorMap<T>];

export type AccumulatorExpression<T extends object> = MapToOperatorSyntax<
  T,
  unknown,
  Accumulators<T>
>;

export type EvaluateAccumulatorExpression<T extends object, E> = {
  [K in keyof AccumulatorMap<T>]: K extends keyof E
    ? AccumulatorMap<T>[K] extends infer Acc
      ? Acc extends (...args: infer Args) => infer R
        ? E[K] extends MapOperatorParameters<T, Args>
          ? R
          : `Invalid params for accumulator ${K}`
        : never
      : never
    : never;
}[keyof AccumulatorMap<T>];
