import { Aggregate } from '../aggregate';

export interface LimitStage<T extends object> {
  $limit: (n: number) => Aggregate<T>;
}
