import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { GeoPoint } from '../../types/geojson';
import { ScoreAdjustment } from '../score/score';

export interface NearOperator<State extends AggregateState> {
  near: {
    path: DeepKeyof<State['T']> | DeepKeyof<State['T']>[];
    origin: number | Date | GeoPoint;
    pivot: number;
    score?: ScoreAdjustment<State>;
  };
}
