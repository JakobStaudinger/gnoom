import { StaticInput } from '../../static-input';

export interface $replaceOne {
  $replaceOne: (
    input: StaticInput<{
      input: string;
      find: string;
      replacement: string;
    }>
  ) => string;
}
