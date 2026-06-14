import { SearchOperators } from '.';
import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface KnnBetaOperator<State extends AggregateState> {
  knnBeta: {
    path: DeepKeyof<State['T']>;
    vector: number[];
    k: number;
    filter?: Partial<SearchOperators<State>>;
    score?: ScoreAdjustment<State>;
  };
}
