import { Aggregate } from '../aggregate';
import { AddStage, AggregateState } from '../types/aggregate-state';

export interface $sample<State extends AggregateState> {
  $sample: (input: { size: number }) => Aggregate<Output<State>>;
}

type Output<State extends AggregateState> = AddStage<State, object>;
