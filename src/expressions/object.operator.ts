import { StaticInput } from './index';

export type ObjectOperator =
  | { $mergeObjects: <T>(x: T, y: T, ...values: T[]) => object }
  | {
      $objectToArray: <T extends object>(obj: T) => { k: string; v: unknown }[];
    }
  | {
      $setField: <T>(
        input: StaticInput<{
          field: string;
          input: object;
          value: T | '$$REMOVE';
        }>
      ) => object;
    }
  | {
      $unsetField: (
        input: StaticInput<{
          field: string;
          input: object;
        }>
      ) => object;
    };
