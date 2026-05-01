import {
  MongoParametersToTypeScriptSyntax,
  TypeScriptToMongoSyntax
} from '../expressions/map-syntax';
import { AggregateState } from '../types/aggregate-state';
import { $addToSet } from './$addToSet';
import { $avg } from './$avg';
import { $bottom } from './$bottom';
import { $bottomN } from './$bottomN';
import { $count } from './$count';
import { $first } from './$first';
import { $firstN } from './$firstN';
import { $last } from './$last';
import { $lastN } from './$lastN';
import { $max } from './$max';
import { $maxN } from './$maxN';
import { $median } from './$median';
import { $mergeObjects } from './$mergeObjects';
import { $min } from './$min';
import { $minN } from './$minN';
import { $percentile } from './$percentile';
import { $push } from './$push';
import { $stdDevPop } from './$stdDevPop';
import { $stdDevSamp } from './$stdDevSamp';
import { $sum } from './$sum';
import { $top } from './$top';
import { $topN } from './$topN';

export interface AccumulatorMap<State extends AggregateState>
  extends
    $addToSet,
    $avg,
    $bottom<State>,
    $bottomN<State>,
    $count,
    $first,
    $firstN,
    $last,
    $lastN,
    $max,
    $maxN,
    $median,
    $mergeObjects,
    $min,
    $minN,
    $percentile,
    $push,
    $stdDevPop,
    $stdDevSamp,
    $sum,
    $top<State>,
    $topN<State> {}

export type AccumulatorExpression<State extends AggregateState> = Partial<
  TypeScriptToMongoSyntax<State, AccumulatorMap<State>>
>;

export type EvaluateAccumulatorExpression<State extends AggregateState, E> = {
  [K in keyof E]: K extends keyof AccumulatorMap<State>
    ? AccumulatorMap<State>[K] extends infer Acc
      ? MongoParametersToTypeScriptSyntax<State, E[K]> extends infer Args
        ? Args extends unknown[]
          ? Acc extends (...args: Args) => infer R
            ? R
            : never
          : never
        : never
      : never
    : never;
}[keyof E];
