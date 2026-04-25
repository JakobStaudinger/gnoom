import { StaticInput } from '../expressions/static-input';

export interface $percentile {
  $percentile: <V extends number>(
    input: StaticInput<{
      input: V;
      p: number[];
      method: StaticInput<'approximate'>;
    }>
  ) => V[];
}
