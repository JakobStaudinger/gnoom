import { Aggregate } from '../aggregate';
import { AggregateLike } from './aggregate-like';
import { AggregateState, NestedPipelineState } from './aggregate-state';
import { AnyObject, EmptyObject } from './object';

export type PipelineCallback<
  T extends object,
  Variables extends AnyObject = EmptyObject
> = (
  aggregate: Aggregate<NestedPipelineState<T, string, Variables>>
) => AggregateLike<AggregateState>;
