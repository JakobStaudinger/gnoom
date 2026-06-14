import { SearchOperators } from '.';
import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface EmbeddedDocumentOperator<State extends AggregateState> {
  embeddedDocument: {
    path: DeepKeyof<State['T']>;
    operator: Partial<SearchOperators<State>>;
    score?: ScoreAdjustment<State>;
  };
}
