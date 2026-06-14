import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import {
  GeoLineString,
  GeoMultiPolygon,
  GeoPoint,
  GeoPolygon
} from '../../types/geojson';
import { ScoreAdjustment } from '../score/score';

export interface geoShape<State extends AggregateState> {
  geoShape: {
    path: DeepKeyof<State['T']> | DeepKeyof<State['T']>;
    geometry: GeoPolygon | GeoMultiPolygon | GeoLineString | GeoPoint;
    relation: 'contains' | 'disjoint' | 'intersects' | 'within';
    score?: ScoreAdjustment<State>;
  };
}
