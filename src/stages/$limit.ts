import { Aggregate } from '../aggregate';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { Simplify } from '../types/simplify';

export interface $limit<State extends AggregateState> {
  $limit: (n: number) => Aggregate<Simplify<Output<State>>>;
}

type Output<State extends AggregateState> = AddStage<State, object>;
