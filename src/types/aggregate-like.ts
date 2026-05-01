import { AggregatePipeline } from '../aggregate';
import { AggregateState } from './aggregate-state';

export type AggregateLike<State extends AggregateState> =
  | AggregatePipeline<State>
  | { toArray: () => AggregatePipeline<State> };
