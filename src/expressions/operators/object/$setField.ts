import { StaticInput } from '../../static-input';

export interface $setField {
  $setField: <T>(
    input: StaticInput<{
      field: string;
      input: object;
      value: T | '$$REMOVE';
    }>
  ) => object;
}
