import { StaticInput } from '../../static-input';

export interface $replaceAll {
  $replaceAll: (
    input: StaticInput<{
      input: string;
      find: string;
      replacement: string;
    }>
  ) => string;
}
