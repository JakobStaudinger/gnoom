import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { GeoMultiPolygon, GeoPoint, GeoPolygon } from '../../types/geojson';
import { ScoreAdjustment } from '../score/score';

export interface geoWithin<State extends AggregateState> {
  geoWithin: {
    path: DeepKeyof<State['T']> | DeepKeyof<State['T']>[];
    box?: {
      bottomLeft: GeoPoint;
      topRight: GeoPoint;
    };
    circle?: {
      center: GeoPoint;
      radius: number;
    };
    geometry?: GeoPolygon | GeoMultiPolygon;
    score?: ScoreAdjustment<State>;
  };
}
