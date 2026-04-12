import { Aggregate } from '../aggregate';
import { DeepKeyof } from '../types/deep-keyof';

export interface SortStage<T extends object> {
  $sort: <const S extends SortSpecification<T>>(
    specification: S
  ) => Aggregate<T>;
}

export type SortSpecification<T extends object> = {
  [K in DeepKeyof<T>]?: 1 | -1 | { $meta: 'textScore' };
};
