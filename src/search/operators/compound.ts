import { SearchOperators } from '../operators';
import { AggregateState } from '../../types/aggregate-state';
import { ScoreAdjustment } from '../score/score';

export interface compound<State extends AggregateState> {
  compound: {
    must?: SearchOperators<State>[];
    mustNot?: SearchOperators<State>[];
    should?: SearchOperators<State>[];
    filter?: SearchOperators<State>[];
    score?: ScoreAdjustment<State>;
    doesNotAffect?: string[];
  };
}
