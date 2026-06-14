import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface ExistsOperator<State extends AggregateState> {
  exists: {
    path: DeepKeyof<State['T']>;
    score?: ScoreAdjustment<State>;
  };
}
