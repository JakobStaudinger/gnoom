import { Aggregate } from '../aggregate';
import { AddStage, AggregateState } from '../types/aggregate-state';

export interface $limit<State extends AggregateState> {
  $limit: (n: number) => Aggregate<Output<State>>;
}

type Output<State extends AggregateState> = AddStage<State, object>;
