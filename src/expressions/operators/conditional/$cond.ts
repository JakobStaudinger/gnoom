import { StaticInput } from '../../static-input';

export interface $cond {
  $cond:
    | (<T, F>(input: StaticInput<{ if: boolean; then: T; else: F }>) => T | F)
    | (<T, F>(_if: boolean, then: T, _else: F) => T | F);
}
