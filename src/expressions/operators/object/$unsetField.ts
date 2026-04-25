import { StaticInput } from '../../static-input';

export interface $unsetField {
  $unsetField: (
    input: StaticInput<{
      field: string;
      input: object;
    }>
  ) => object;
}
