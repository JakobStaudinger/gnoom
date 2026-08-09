import { AggregateState } from '../../types/aggregate-state';
import { AccumulatorExpression, EvaluateAccumulatorExpression } from '../index';

export function evaluateAccumulator<State extends AggregateState>(): <
  const E extends AccumulatorExpression<State>
>(
  expression: E
) => EvaluateAccumulatorExpression<State, E> {
  return () => null!;
}
