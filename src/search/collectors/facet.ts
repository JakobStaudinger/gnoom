import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { SearchOperators } from '../operators';

export interface FacetCollector<State extends AggregateState> {
  facet: {
    facets: Record<
      string,
      | {
          type: 'string';
          path: DeepKeyof<State['T']>;
          numBuckets?: number;
        }
      | {
          type: 'number';
          path: DeepKeyof<State['T']>;
          boundaries: [number, number, ...number[]];
          default?: string;
        }
      | {
          type: 'date';
          path: DeepKeyof<State['T']>;
          boundaries: [Date, Date, ...Date[]];
          default?: string;
        }
    >;
    operator?: SearchOperators<State>;
  };
}
