import { StaticInput } from '../../static-input';

export interface $reduce {
  $reduce: <T, R>(
    input: StaticInput<{ input: T[]; initialValue: R; in: R }>
  ) => R;
}
