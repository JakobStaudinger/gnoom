import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AggregateState } from '../types/aggregate-state';

export function evaluate<State extends AggregateState>(): <
  const E extends AggregateExpression<State>
>(
  expression: E
) => EvaluateAggregateExpression<State, E> {
  return () => null!;
}
