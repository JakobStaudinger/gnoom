import {
  MongoParametersToTypeScriptSyntax,
  TypeScriptToMongoSyntax
} from '../expressions/map-to-operator-syntax';
import { TimeUnit } from '../expressions/operators/date.operator';
import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';

interface AccumulatorWindowOperatorMap<T extends object> {
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
  $covariancePop: <V extends number>(x: V, y: V) => V;
  $covarianceSamp: <V extends number>(x: V, y: V) => V;
  $derivative: <V extends number>(
    input: StaticInput<{ input: V; unit: WindowTimeUnit }>
  ) => V;
  $expMovingAvg: <V extends number>(
    input: StaticInput<
      | { input: V; N: StaticInput<number> }
      | { input: V; alpha: StaticInput<number> }
    >
  ) => V;
  $firstN: <V>(input: StaticInput<{ input: V; n: number }>) => V[];
  $integral: <V extends number>(
    input: StaticInput<{ input: V; unit: WindowTimeUnit }>
  ) => V;
  $lastN: <V>(input: StaticInput<{ input: V; n: number }>) => V[];
  $max: <V extends number>(value: V) => V;
  $maxN: <V extends number>(input: StaticInput<{ input: V; n: number }>) => V[];
  $median: <V extends number>(
    input: StaticInput<{ input: V; method: StaticInput<'approximate'> }>
  ) => V;
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
  $setUnion: <V>(value: V[]) => V[];
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

interface GapFillingWindowOperatorMap {
  $linearFill: <V extends number>(value: V) => V;
  $locf: <V>(value: V) => V;
}

interface OrderWindowOperatorMap {
  $first: <V>(value: V) => V;
  $last: <V>(value: V) => V;
  $shift: <V, D = null>(
    input: StaticInput<{
      output: V;
      by: StaticInput<number>;
      default?: D;
    }>
  ) => V | D;
}

interface RankWindowOperatorMap {
  $denseRank: () => number;
  $documentNumber: () => number;
  $rank: () => number;
}

interface WindowOperatorMap<T extends object>
  extends
    AccumulatorWindowOperatorMap<T>,
    GapFillingWindowOperatorMap,
    OrderWindowOperatorMap,
    RankWindowOperatorMap {}

type WindowOperators<T extends object> = {
  [K in keyof WindowOperatorMap<T>]: { [P in K]: WindowOperatorMap<T>[K] };
}[keyof WindowOperatorMap<T>];

type WindowTimeUnit =
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

export type WindowOperatorExpression<T extends object> =
  TypeScriptToMongoSyntax<T, WindowOperators<T>> & {
    window?:
      | { documents: [lower: DocumentBoundary, upper: DocumentBoundary] }
      | { range: [lower: number, upper: number]; unit?: TimeUnit };
  };

type DocumentBoundary = 'current' | 'unbounded' | number;

export type EvaluateWindowOperatorExpression<T extends object, E> = {
  [K in keyof E]: K extends keyof WindowOperatorMap<T>
    ? WindowOperatorMap<T>[K] extends infer Op
      ? MongoParametersToTypeScriptSyntax<T, E[K]> extends infer Args
        ? Args extends unknown[]
          ? Op extends (...args: Args) => infer R
            ? R
            : never
          : never
        : never
      : never
    : never;
}[keyof E];
