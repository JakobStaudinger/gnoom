import { StaticInput } from '../../static-input';

export interface $encStrStartsWith {
  $encStrStartsWith: (
    input: StaticInput<{
      input: unknown;
      prefix: string;
    }>
  ) => boolean;
}
