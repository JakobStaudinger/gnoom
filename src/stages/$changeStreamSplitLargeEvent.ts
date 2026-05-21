import { Aggregate } from '../aggregate';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { EmptyObject } from '../types/object';

export interface $changeStreamSplitLargeEvent<State extends AggregateState> {
  $changeStreamSplitLargeEvent: (
    specification: EmptyObject
  ) => Aggregate<Output<State>>;
}

type Output<State extends AggregateState> = AddStage<
  State,
  {
    T: Partial<State['T']> & { splitEvent: { fragment: number; of: number } };
    finalStage: '$changeStreamSplitLargeEvent';
  }
>;
