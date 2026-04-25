import { StaticInput } from '../../static-input';

export interface $ltrim {
  $ltrim: (
    input: StaticInput<{
      input: string;
      chars?: string;
    }>
  ) => string;
}
