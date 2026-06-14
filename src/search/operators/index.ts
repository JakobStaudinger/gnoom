import { AggregateState } from '../../types/aggregate-state';
import { autocomplete } from './autocomplete';
import { compound } from './compound';

export interface SearchOperators<State extends AggregateState>
  extends autocomplete<State>, compound<State> {}
