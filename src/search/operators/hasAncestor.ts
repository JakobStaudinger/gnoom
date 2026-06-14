import { SearchOperators } from '.';
import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';

export interface hasAncestor<State extends AggregateState> {
  ancestorPath: DeepKeyof<State['T']>;
  operator: Partial<SearchOperators<State>>;
}
