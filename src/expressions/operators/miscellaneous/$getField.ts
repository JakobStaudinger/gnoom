import { StaticInput } from '../../static-input';

export interface $getField {
  $getField: (input: StaticInput<{ field: string; input?: object }>) => unknown;
}
