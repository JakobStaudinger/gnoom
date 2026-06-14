import { AggregateState } from '../../types/aggregate-state';
import { AnyObject } from '../../types/object';
import { ScoreAdjustment } from '../score/score';

export interface MoreLikeThisOperator<State extends AggregateState> {
  moreLikeThis: {
    like: AnyObject | AnyObject[];
    score?: ScoreAdjustment<State>;
  };
}
