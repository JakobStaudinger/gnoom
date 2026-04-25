import { AggregatePipeline } from '../aggregate';

export type AggregateLike<T> =
  | AggregatePipeline<T>
  | { toArray: () => AggregatePipeline<T> };
