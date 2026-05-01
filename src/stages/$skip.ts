import { Aggregate } from '../aggregate';
import { AggregateState } from '../types/aggregate-state';

export interface SkipStage<State extends AggregateState> {
  $skip: (n: number) => Aggregate<State>;
}
