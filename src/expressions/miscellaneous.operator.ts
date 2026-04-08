import { StaticInput } from './index';

export type MiscellaneousOperator =
  | {
      $getField: (
        input: StaticInput<{ field: string; input?: object }>
      ) => unknown;
    }
  | { $rand: () => number }
  | { $toHashedIndexKey: (val: unknown) => number };
