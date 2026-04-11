import { StaticInput } from '../static-input';

export interface MiscellaneousOperatorMap {
  $getField: (input: StaticInput<{ field: string; input?: object }>) => unknown;
  $rand: () => number;
  $toHashedIndexKey: (val: unknown) => number;
}
