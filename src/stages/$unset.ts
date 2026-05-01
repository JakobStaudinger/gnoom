import { Aggregate } from '../aggregate';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface UnsetStage<State extends AggregateState> {
  $unset: <const S extends UnsetSpecification<State>>(
    specification: S
  ) => Aggregate<UnsetOutput<State, S>>;
}

type UnsetSpecification<State extends AggregateState> =
  | keyof State['T']
  | (keyof State['T'])[];

type UnsetOutput<
  State extends AggregateState,
  S extends UnsetSpecification<State>
> = WithType<State, Omit<State['T'], S extends (infer K)[] ? K : S>>;
