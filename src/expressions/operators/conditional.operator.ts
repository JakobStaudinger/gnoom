import { StaticInput } from '../static-input';

export interface ConditionalOperatorMap {
  $cond:
    | (<T, F>(input: StaticInput<{ if: boolean; then: T; else: F }>) => T | F)
    | (<T, F>(_if: boolean, then: T, _else: F) => T | F);
  $ifNull: <T>(value: T, ...fallbacks: T[]) => T;
  $switch: <T>(
    input: StaticInput<{
      branches: { case: boolean; then: T }[];
      default?: T;
    }>
  ) => T;
}
