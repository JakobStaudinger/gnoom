import { Aggregate } from '../aggregate';
import { AddStage, AggregateState } from '../types/aggregate-state';

export interface $count<State extends AggregateState> {
  $count: <const S extends Specification>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

type Specification = string;

type Output<State extends AggregateState, S extends Specification> = AddStage<
  State,
  { T: { [K in S]: number } }
>;
