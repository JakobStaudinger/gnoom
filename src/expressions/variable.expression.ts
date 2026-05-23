import { AggregateState } from '../types/aggregate-state';
import {
  EvaluatePathLikeExpression,
  PathLikeExpression
} from './path-like.expression';

export type VariableExpression<State extends AggregateState> =
  PathLikeExpression<'$$', State['systemVariables']>;

export type EvaluateVariableExpression<
  State extends AggregateState,
  Path extends string
> = EvaluatePathLikeExpression<'$$', State['systemVariables'], Path>;
