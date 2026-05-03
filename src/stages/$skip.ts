import { Aggregate } from '../aggregate';
import { AggregateState } from '../types/aggregate-state';

export interface $skip<State extends AggregateState> {
  $skip: (n: number) => Aggregate<State>;
}
