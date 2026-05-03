import { Aggregate } from '../aggregate';
import { AggregateState, Finalize, WithType } from '../types/aggregate-state';
import { EmptyObject } from '../types/object';

export interface $changeStreamSplitLargeEvent<State extends AggregateState> {
  $changeStreamSplitLargeEvent: (
    specification: EmptyObject
  ) => Aggregate<Output<State>>;
}

type Output<State extends AggregateState> = Finalize<
  WithType<
    State,
    Partial<State['T']> & { splitEvent: { fragment: number; of: number } }
  >,
  '$changeStreamSplitLargeEvent'
>;
