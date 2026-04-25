import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';

export interface $top<T extends object> {
  $top: <O>(
    input: StaticInput<{
      sortBy: StaticInput<SortSpecification<T>>;
      output: O;
    }>
  ) => O;
}
