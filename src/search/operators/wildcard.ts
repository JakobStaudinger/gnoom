import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface WildcardOperator<State extends AggregateState> {
  wildcard: {
    path:
      | DeepKeyof<State['T']>
      | { wildcard: string }
      | (DeepKeyof<State['T']> | { wildcard: string })[];
    query: string | string[];
    allowAnalyzedField?: boolean;
    score?: ScoreAdjustment<State>;
  };
}
