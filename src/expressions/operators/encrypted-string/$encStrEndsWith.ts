import { StaticInput } from '../../static-input';

export interface $encStrEndsWith {
  $encStrEndsWith: (
    input: StaticInput<{
      input: unknown;
      suffix: string;
    }>
  ) => boolean;
}
