import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface RegexOperator<State extends AggregateState> {
  regex: {
    path: DeepKeyof<State['T']> | DeepKeyof<State['T']>[];
    query: string | string[];
    allowAnalyzedField?: boolean;
    score?: ScoreAdjustment<State>;
  };
}
