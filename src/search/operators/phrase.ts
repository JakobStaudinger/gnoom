import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface PhraseOperator<State extends AggregateState> {
  phrase: {
    path: DeepKeyof<State['T']> | DeepKeyof<State['T']>[];
    query: string | string[];
    slop?: number;
    score?: ScoreAdjustment<State>;
    synonyms?: string;
  };
}
