import { QueryPredicate } from '../query-predicates';
import { AggregateState } from '../types/aggregate-state';

type ExpectQueryPredicate<State extends AggregateState, P> =
  P extends QueryPredicate<State>
    ? { toBeValid: () => void; toBeInvalid: never }
    : { toBeValid: never; toBeInvalid: () => void };

export function expectQueryPredicate<State extends AggregateState>(): <
  const P extends QueryPredicate<State> | (unknown & {})
>(
  p: P
) => ExpectQueryPredicate<State, P> {
  return <P>() => {
    return {
      toBeValid() {},
      toBeInvalid() {}
    } as ExpectQueryPredicate<State, P>;
  };
}
