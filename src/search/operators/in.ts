import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { Primitive } from '../../types/primitive';
import { ScoreAdjustment } from '../score/score';

export interface InOperator<State extends AggregateState> {
  in: {
    path: DeepKeyof<State['T']> | DeepKeyof<State['T']>[];
    value: Primitive | Primitive[];
    doesNotAffect?: string | string[];
    score?: ScoreAdjustment<State>;
  };
}
