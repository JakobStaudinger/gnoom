import { AggregateState } from '../types/aggregate-state';
import { EvaluateFunctionLikeExpression } from '../types/evaluate';
import { TypeScriptToMongoSyntax } from '../types/map-syntax';
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

export type AccumulatorExpression<State extends AggregateState> = Partial<
  TypeScriptToMongoSyntax<State, Accumulators<State>>
>;

export type EvaluateAccumulatorExpression<
  State extends AggregateState,
  E
> = EvaluateFunctionLikeExpression<
  State,
  E,
  Accumulators<State>,
  'accumulator'
>;

interface Accumulators<State extends AggregateState>
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
