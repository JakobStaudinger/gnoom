import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { Primitive } from '../../types/primitive';
import { ScoreAdjustment } from '../score/score';

export interface RangeOperator<State extends AggregateState> {
  range: {
    path: DeepKeyof<State['T']> | DeepKeyof<State['T']>[];
    gt?: Primitive;
    gte?: Primitive;
    lt?: Primitive;
    lte?: Primitive;
    score?: ScoreAdjustment<State>;
    doesNotAffect?: string | string[];
  };
}
