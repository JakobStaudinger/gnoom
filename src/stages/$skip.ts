import { Aggregate } from '../aggregate';
import { AddStage, AggregateState } from '../types/aggregate-state';

export interface $skip<State extends AggregateState> {
  $skip: (n: number) => Aggregate<Output<State>>;
}

type Output<State extends AggregateState> = AddStage<State, object>;
