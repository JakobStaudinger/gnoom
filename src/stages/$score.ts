import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { Simplify } from '../types/simplify';

export interface $score<State extends AggregateState> {
  $score: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Simplify<Output<State>>>;
}

type Specification<State extends AggregateState> = {
  score: AggregateExpression<State>;
  scoreDetails?: boolean;
  normalization?: 'none' | 'sigmoid' | 'minMaxScaler';
  weight?: number;
};

type Output<State extends AggregateState> = AddStage<State, { T: State['T'] }>;
