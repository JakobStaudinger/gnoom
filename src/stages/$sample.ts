import { Aggregate } from '../aggregate';

export interface SampleStage<T extends object> {
  $sample: (input: { size: number }) => Aggregate<T>;
}
