import {
  MongoParametersToTypeScriptSyntax,
  TypeScriptToMongoSyntax
} from '../expressions/map-syntax';
import { TimeUnit } from '../expressions/operators/date/types';
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

interface WindowOperatorMap<T extends object>
  extends
    $addToSet,
    $avg,
    $bottom<T>,
    $bottomN<T>,
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
    $top<T>,
    $topN<T> {}

type WindowOperators<T extends object> = {
  [K in keyof WindowOperatorMap<T>]: { [P in K]: WindowOperatorMap<T>[K] };
}[keyof WindowOperatorMap<T>];

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
