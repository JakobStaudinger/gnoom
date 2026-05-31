import { Aggregate } from '../aggregate';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { Simplify } from '../types/simplify';

export interface $skip<State extends AggregateState> {
  $skip: (n: number) => Aggregate<Simplify<Output<State>>>;
}

type Output<State extends AggregateState> = AddStage<State, object>;
