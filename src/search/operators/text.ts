import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface TextOperator<State extends AggregateState> {
  text: {
    path: DeepKeyof<State['T']> | DeepKeyof<State['T']>[];
    query: string | string[];
    fuzzy?: {
      maxEdits?: number;
      prefixLength?: number;
      maxExpansions?: number;
    };
    matchCriteria?: 'any' | 'all';
    score?: ScoreAdjustment<State>;
    synonyms?: string;
  };
}
