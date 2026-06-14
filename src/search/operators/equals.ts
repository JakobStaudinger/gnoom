import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { Primitive } from '../../types/primitive';
import { ScoreAdjustment } from '../score/score';

export interface equals<State extends AggregateState> {
  equals: {
    path: DeepKeyof<State['T']>;
    value: Primitive | null;
    score?: ScoreAdjustment<State>;
    doesNotAffect?: string | string[];
  };
}
