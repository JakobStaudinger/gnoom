import { StaticInput } from '../../static-input';

export interface $median {
  $median: <T>(
    input: StaticInput<{ input: T[]; method: StaticInput<'approximate'> }>
  ) => T;
}
