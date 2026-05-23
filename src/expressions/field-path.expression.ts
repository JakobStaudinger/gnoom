import { AggregateState } from '../types/aggregate-state';
import {
  EvaluatePathLikeExpression,
  PathLikeExpression
} from './path-like.expression';

export type FieldPathExpression<State extends AggregateState> =
  PathLikeExpression<'$', State['T']>;

export type EvaluateFieldPathExpression<
  State extends AggregateState,
  Path extends string
> = EvaluatePathLikeExpression<'$', State['T'], Path>;
