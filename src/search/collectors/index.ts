import { AggregateState } from '../../types/aggregate-state';
import { facet } from './facet';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SearchCollectors<
  State extends AggregateState
> extends facet<State> {}
