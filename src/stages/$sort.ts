import { Aggregate } from '../aggregate';

export interface SortStage<T extends object> {
  $sort: <const S extends SortSpecification<T>>(
    specification: S
  ) => Aggregate<T>;
}

export type SortSpecification<T extends object> = {
  [K in keyof T]?: 1 | -1 | { $meta: 'textScore' };
};
