import { Aggregate } from '../aggregate';
import { AggregateLike } from './aggregate-like';
import { NestedPipelineState } from './aggregate-state';

export type PipelineCallback<T extends object> = (
  aggregate: Aggregate<T, NestedPipelineState>
) => AggregateLike<object>;
