import { Aggregate } from '../aggregate';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface $unset<State extends AggregateState> {
  $unset: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

type Specification<State extends AggregateState> =
  | keyof State['T']
  | (keyof State['T'])[];

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<State, Omit<State['T'], S extends (infer K)[] ? K : S>>;
