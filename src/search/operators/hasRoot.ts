import { SearchOperators } from '.';
import { AggregateState } from '../../types/aggregate-state';

export interface hasRoot<State extends AggregateState> {
  hasRoot: {
    operator: Partial<SearchOperators<State>>;
  };
}
