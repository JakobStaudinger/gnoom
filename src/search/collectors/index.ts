import { AggregateState } from '../../types/aggregate-state';
import { FacetCollector } from './facet';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SearchCollectors<
  State extends AggregateState
> extends FacetCollector<State> {}
