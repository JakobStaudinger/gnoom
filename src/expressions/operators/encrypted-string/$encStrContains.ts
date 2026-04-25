import { StaticInput } from '../../static-input';

export interface $encStrContains {
  $encStrContains: (
    input: StaticInput<{
      input: unknown;
      substring: string;
    }>
  ) => boolean;
}
