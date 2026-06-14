import { SearchOperators } from '.';
import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface VectorSearchOperator<State extends AggregateState> {
  vectorSearch: {
    path: DeepKeyof<State['T']>;
    limit: number;
    queryVector: number[];
    filter?: Partial<SearchOperators<State>>;
    score?: ScoreAdjustment<State>;
  } & (
    | { exact: true }
    | {
        exact?: false;
        numCandidates: number;
      }
  );
}
