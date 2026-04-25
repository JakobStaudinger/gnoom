import { StaticInput } from '../../static-input';

export interface $switch {
  $switch: <T>(
    input: StaticInput<{
      branches: { case: boolean; then: T }[];
      default?: T;
    }>
  ) => T;
}
