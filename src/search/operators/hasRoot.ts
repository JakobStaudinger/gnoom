import { SearchOperators } from '.';
import { AggregateState } from '../../types/aggregate-state';

export interface HasRootOperator<State extends AggregateState> {
  hasRoot: {
    operator: Partial<SearchOperators<State>>;
  };
}
