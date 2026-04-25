import { StaticInput } from '../../static-input';

export interface $rtrim {
  $rtrim: (
    input: StaticInput<{
      input: string;
      chars?: string;
    }>
  ) => string;
}
