import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';

export interface $bottomN<T extends object> {
  $bottomN: <O>(
    input: StaticInput<{
      n: number;
      sortBy: StaticInput<SortSpecification<T>>;
      output: O;
    }>
  ) => O[];
}
