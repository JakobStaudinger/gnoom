import { Timestamp } from 'mongodb';
import { Aggregate } from '../aggregate';
import { AnyObject, EmptyObject } from './object';
import { GnoomError } from './error';
import { Simplify } from './simplify';

export interface AggregateState {
  T: object;
  systemVariables: SystemVariables<object>;
  hasStage: boolean;
  allowedStages: string;
  finalStage: string;
}

export interface SystemVariables<T> {
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
      error: GnoomError<{
        message: `${State['finalStage']} must be the last stage in a pipeline.`;
      }>
    ) => Aggregate<State>;

export type MustBeFirstStage<
  State extends AggregateState,
  T
> = State['hasStage'] extends true
  ? (
      error: GnoomError<{ message: 'Must be the first stage in a pipeline' }>
    ) => Aggregate<State>
  : T;

export type AddStage<
  State extends AggregateState,
  Changes extends Partial<AggregateState>
> = {
  [K in keyof State | keyof Changes]: K extends 'hasStage'
    ? true
    : K extends keyof Changes
      ? Simplify<Changes[K]>
      : K extends keyof State
        ? State[K]
        : never;
};

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
  AllowedStages extends AggregateState['allowedStages'],
  Variables extends AnyObject
> {
  T: T;
  hasStage: false;
  allowedStages: AllowedStages;
  finalStage: never;
  systemVariables: Variables extends EmptyObject
    ? SystemVariables<this['T']>
    : SystemVariables<this['T']> & Variables;
}

type _NestedPipelineStateGuard = AssertExtendsAggregateState<
  NestedPipelineState<object, string, EmptyObject>
>;
