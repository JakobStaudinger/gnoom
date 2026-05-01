import { Aggregate } from '../aggregate';
import { AggregateLike } from './aggregate-like';
import { AggregateState, NestedPipelineState } from './aggregate-state';

export type PipelineCallback<T extends object> = (
  aggregate: Aggregate<NestedPipelineState<T, string>>
) => AggregateLike<AggregateState>;
