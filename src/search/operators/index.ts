import { AggregateState } from '../../types/aggregate-state';
import { autocomplete } from './autocomplete';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SearchOperators<
  State extends AggregateState
> extends autocomplete<State> {}
