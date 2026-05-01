import { Aggregate } from '../aggregate';
import { AggregateState } from '../types/aggregate-state';

export interface SampleStage<State extends AggregateState> {
  $sample: (input: { size: number }) => Aggregate<State>;
}
