import { Aggregate } from '../aggregate';
import { AggregateState } from '../types/aggregate-state';

export interface LimitStage<State extends AggregateState> {
  $limit: (n: number) => Aggregate<State>;
}
