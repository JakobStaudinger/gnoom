import { StaticInput } from '../expressions/static-input';

export interface $median {
  $median: <V extends number>(
    input: StaticInput<{ input: V; method: StaticInput<'approximate'> }>
  ) => V;
}
