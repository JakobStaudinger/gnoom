import { Aggregate } from '../aggregate';

export interface SkipStage<T extends object> {
  $skip: (n: number) => Aggregate<T>;
}
