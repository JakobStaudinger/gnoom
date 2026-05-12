import { Timestamp } from 'mongodb';
import { ErrorsFromFields, GnoomError } from './error';
import { Aggregate } from '../aggregate';

export interface AggregateState {
  T: object;
  error: unknown;
  systemVariables: SystemVariables<object>;
  hasStage: boolean;
  allowedStages: string;
  finalStage: string;
}

interface SystemVariables<T> {
  NOW: Date;
  CLUSTER_TIME: Timestamp;
  ROOT: T;
  CURRENT: T;
  REMOVE: undefined;
}

export type UnlessFinalized<
  State extends AggregateState,
  T
> = State['finalStage'] extends never
  ? T
  : (
      error: `${State['finalStage']} must be the last stage in a pipeline.`
    ) => Aggregate<State>;

export type MustBeFirstStage<
  State extends AggregateState,
  T
> = State['hasStage'] extends true
  ? (error: 'Must be the first stage in a pipeline') => Aggregate<State>
  : T;

export type Finalize<State extends AggregateState, Stage extends string> = Omit<
  State,
  'finalStage'
> & { finalStage: Stage };

export type WithType<
  State extends AggregateState,
  T extends object
> = WithError<Omit<State, 'T'> & { T: T }, ErrorsFromFields<T>>;

export type WithError<State extends AggregateState, E> = Omit<
  State,
  'error'
> & { error: State['error'] | E };

export type IgnoreError<State extends AggregateState, E extends string> = Omit<
  State,
  'error'
> & { error: Exclude<State['error'], GnoomError<{ message: E }>> };

export interface InitialState<T> {
  T: T;
  error: never;
  hasStage: false;
  allowedStages: string;
  finalStage: never;
  systemVariables: SystemVariables<this['T']>;
}
type AssertExtendsAggregateState<State extends AggregateState> = State;
type _InitialStateGuard = AssertExtendsAggregateState<InitialState<object>>;

export interface NestedPipelineState<
  T,
  AllowedStages extends AggregateState['allowedStages']
> {
  T: T;
  error: never;
  hasStage: false;
  allowedStages: AllowedStages;
  finalStage: never;
  systemVariables: SystemVariables<this['T']>;
}

type _NestedPipelineStateGuard = AssertExtendsAggregateState<
  NestedPipelineState<object, string>
>;
