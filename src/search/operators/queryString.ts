import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface QueryStringOperator<State extends AggregateState> {
  queryString: {
    defaultPath: DeepKeyof<State['T']>;
    query: string;
    score?: ScoreAdjustment<State>;
  };
}
