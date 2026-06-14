import { SortSpecification } from '../stages/$sort';
import { AggregateState } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { GnoomError } from '../types/error';
import { SearchCollectors } from './collectors';
import { SearchOperators } from './operators';

export type SearchSpecification<State extends AggregateState> = {
  index?: string;
  concurrent?: boolean;
  returnStoredSource?: boolean;
  searchAfter?: string;
  searchBefore?: string;
  scoreDetails?: boolean;
  highlight?: {
    path:
      | DeepKeyof<State['T']>
      | { value: string; multi: string }
      | (DeepKeyof<State['T']> | { value: string; multi: string })[]
      | { wildcard: string };
    maxCharsToExamine?: number;
    maxNumPassages?: number;
  };
  count?:
    | { type: 'total' }
    | {
        type?: 'lowerBound';
        threshold?: number;
      };
  sort?: SortSpecification<State>;
  searchNodePreference?: {
    key: string;
  };
} & (
  | {
      returnScope?: {
        path: DeepKeyof<State['T']>;
      };
      returnStoredSource: true;
    }
  | { returnStoredSource?: false }
) &
  Partial<SearchCollectors<State>> &
  Partial<SearchOperators<State>>;

export type SearchMeta<
  State extends AggregateState,
  S extends SearchSpecification<State>
> = (S['count'] extends { type: 'total' }
  ? { count: { total: number } }
  : { count: { lowerBound: number } }) &
  (S['facet'] extends { facets: infer Facets }
    ? {
        facet: {
          -readonly [K in keyof Facets]: {
            buckets: {
              _id: Facets[K] extends { type: 'string' }
                ? string
                : Facets[K] extends { type: 'number'; default?: infer Default }
                  ? number | (unknown extends Default ? never : Default)
                  : Facets[K] extends { type: 'date'; default?: infer Default }
                    ? Date | (unknown extends Default ? never : Default)
                    : GnoomError<{ message: 'Unknown facet type' }>;
              count: number;
            }[];
          };
        };
      }
    : unknown);
