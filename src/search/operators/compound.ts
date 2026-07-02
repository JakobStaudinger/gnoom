import { SearchOperators } from '../operators';
import { AggregateState } from '../../types/aggregate-state';
import { ScoreAdjustment } from '../score/score';

export interface CompoundOperator<State extends AggregateState> {
  compound: {
    must?: Partial<SearchOperators<State>>[];
    mustNot?: Partial<SearchOperators<State>>[];
    should?: Partial<SearchOperators<State>>[];
    filter?: Partial<SearchOperators<State>>[];
    score?: ScoreAdjustment<State>;
    doesNotAffect?: string | string[];
    minimumShouldMatch?: number;
  };
}
