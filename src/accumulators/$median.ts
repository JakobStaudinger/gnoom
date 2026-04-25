import { StaticInput } from '../expressions/static-input';

export interface $median {
  $median: (
    input: StaticInput<{ input: number; method: StaticInput<'approximate'> }>
  ) => number;
}
