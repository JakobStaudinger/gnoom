import { Aggregate } from '../aggregate';

export interface CountStage {
  $count: <const S extends CountSpecification>(
    specification: S
  ) => Aggregate<CountOutput<S>>;
}

type CountSpecification = string;

type CountOutput<S extends CountSpecification> = { [K in S]: number };
