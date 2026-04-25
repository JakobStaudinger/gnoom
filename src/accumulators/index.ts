import {
  MongoParametersToTypeScriptSyntax,
  TypeScriptToMongoSyntax
} from '../expressions/map-syntax';
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

export interface AccumulatorMap<T extends object>
  extends
    $addToSet,
    $avg,
    $bottom<T>,
    $bottomN<T>,
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
    $top<T>,
    $topN<T> {}

export type AccumulatorExpression<T extends object> = Partial<
  TypeScriptToMongoSyntax<T, AccumulatorMap<T>>
>;

export type EvaluateAccumulatorExpression<T extends object, E> = {
  [K in keyof E]: K extends keyof AccumulatorMap<T>
    ? AccumulatorMap<T>[K] extends infer Acc
      ? MongoParametersToTypeScriptSyntax<T, E[K]> extends infer Args
        ? Args extends unknown[]
          ? Acc extends (...args: Args) => infer R
            ? R
            : never
          : never
        : never
      : never
    : never;
}[keyof E];
