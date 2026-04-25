import { StaticInput } from '../../static-input';

export interface $zip {
  $zip: (
    input: StaticInput<{
      inputs: unknown[][];
      useLongestLength?: boolean;
      defaults?: unknown[];
    }>
  ) => unknown[];
}
