import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';

export interface $bottom<T extends object> {
  $bottom: <O>(
    input: StaticInput<{
      sortBy: StaticInput<SortSpecification<T>>;
      output: O;
    }>
  ) => O;
}
