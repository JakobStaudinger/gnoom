import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';

export interface $topN<T extends object> {
  $topN: <O>(
    input: StaticInput<{
      n: number;
      sortBy: StaticInput<SortSpecification<T>>;
      output: O;
    }>
  ) => O[];
}
