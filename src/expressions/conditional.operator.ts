import { StaticInput } from './index';

export type ConditionalOperator =
  | {
      $cond: <T, F>(
        input: StaticInput<{ if: boolean; then: T; else: F }>
      ) => T | F;
    }
  | { $cond: <T, F>(_if: boolean, then: T, _else: F) => T | F }
  | {
      $ifNull: <T>(value: T, ...fallbacks: T[]) => T;
    }
  | {
      $switch: <T>(
        input: StaticInput<{
          branches: { case: boolean; then: T }[];
          default?: T;
        }>
      ) => T;
    };
