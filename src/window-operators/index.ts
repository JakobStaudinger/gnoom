import {
  MongoParametersToTypeScriptSyntax,
  TypeScriptToMongoSyntax
} from '../expressions/map-syntax';
import { TimeUnit } from '../expressions/operators/date/types';
import { AggregateState } from '../types/aggregate-state';
import { $addToSet } from './$addToSet';
import { $avg } from './$avg';
import { $bottom } from './$bottom';
import { $bottomN } from './$bottomN';
import { $count } from './$count';
import { $covariancePop } from './$covariancePop';
import { $covarianceSamp } from './$covarianceSamp';
import { $denseRank } from './$denseRank';
import { $derivative } from './$derivative';
import { $documentNumber } from './$documentNumber';
import { $expMovingAvg } from './$expMovingAvg';
import { $first } from './$first';
import { $firstN } from './$firstN';
import { $integral } from './$integral';
import { $last } from './$last';
import { $lastN } from './$lastN';
import { $linearFill } from './$linearFill';
import { $locf } from './$locf';
import { $max } from './$max';
import { $maxN } from './$maxN';
import { $median } from './$median';
import { $min } from './$min';
import { $minN } from './$minN';
import { $percentile } from './$percentile';
import { $push } from './$push';
import { $rank } from './$rank';
import { $setUnion } from './$setUnion';
import { $shift } from './$shift';
import { $stdDevPop } from './$stdDevPop';
import { $stdDevSamp } from './$stdDevSamp';
import { $sum } from './$sum';
import { $top } from './$top';
import { $topN } from './$topN';

interface WindowOperators<State extends AggregateState>
  extends
    $addToSet,
    $avg,
    $bottom<State>,
    $bottomN<State>,
    $count,
    $covariancePop,
    $covarianceSamp,
    $denseRank,
    $derivative,
    $documentNumber,
    $expMovingAvg,
    $first,
    $firstN,
    $integral,
    $last,
    $lastN,
    $linearFill,
    $locf,
    $max,
    $maxN,
    $median,
    $min,
    $minN,
    $percentile,
    $push,
    $rank,
    $setUnion,
    $shift,
    $stdDevPop,
    $stdDevSamp,
    $sum,
    $top<State>,
    $topN<State> {}

export type WindowOperatorExpression<State extends AggregateState> = Partial<
  TypeScriptToMongoSyntax<State, WindowOperators<State>>
> & {
  window?:
    | { documents: [lower: DocumentBoundary, upper: DocumentBoundary] }
    | { range: [lower: number, upper: number]; unit?: TimeUnit };
};

type DocumentBoundary = 'current' | 'unbounded' | number;

export type EvaluateWindowOperatorExpression<
  State extends AggregateState,
  E
> = {
  [K in keyof E]: K extends keyof WindowOperators<State>
    ? WindowOperators<State>[K] extends infer Op
      ? MongoParametersToTypeScriptSyntax<State, E[K]> extends infer Args
        ? Args extends unknown[]
          ? Op extends (...args: Args) => infer R
            ? R
            : never
          : never
        : never
      : never
    : never;
}[keyof E];
