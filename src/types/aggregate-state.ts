import { Timestamp } from 'mongodb';

export interface AggregateState {
  T: object;
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
}

export type UnlessFinalized<
  State extends AggregateState,
  T
> = State['finalStage'] extends never
  ? T
  : (
      error: `${State['finalStage']} must be the last stage in a pipeline.`
    ) => never;

export type MustBeFirstStage<
  State extends AggregateState,
  T
> = State['hasStage'] extends true
  ? (error: 'Must be the first stage in a pipeline') => never
  : T;

export type Finalize<State extends AggregateState, Stage extends string> = Omit<
  State,
  'finalStage'
> & { finalStage: Stage };

export type WithType<State extends AggregateState, T extends object> = Omit<
  State,
  'T'
> & { T: T };

export interface InitialState<T> {
  T: T;
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
  hasStage: false;
  allowedStages: AllowedStages;
  finalStage: never;
  systemVariables: SystemVariables<this['T']>;
}

type _NestedPipelineStateGuard = AssertExtendsAggregateState<
  NestedPipelineState<object, string>
>;
