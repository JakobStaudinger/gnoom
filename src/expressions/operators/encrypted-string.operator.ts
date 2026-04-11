import { StaticInput } from '../static-input';

export interface EncryptedStringOperatorMap {
  $encStrContains: (
    input: StaticInput<{
      input: unknown;
      substring: string;
    }>
  ) => boolean;
  $encStrEndsWith: (
    input: StaticInput<{
      input: unknown;
      suffix: string;
    }>
  ) => boolean;
  $encStrNormalizedEq: (
    input: StaticInput<{
      input: unknown;
      string: string;
    }>
  ) => boolean;
  $encStrStartsWith: (
    input: StaticInput<{
      input: unknown;
      prefix: string;
    }>
  ) => boolean;
}
