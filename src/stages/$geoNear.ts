import { Aggregate } from '../aggregate';
import { QueryPredicate } from '../query-predicates';
import { AggregateState, MustBeFirstStage } from '../types/aggregate-state';
import { DeepKeyof, DeepType } from '../types/deep';
import { Merge } from '../types/merge';

export interface GeoNearStage<T extends object, State extends AggregateState> {
  $geoNear: MustBeFirstStage<
    State,
    <const S extends GeoNearSpecification<T>>(
      specification: S
    ) => Aggregate<GeoNearOutput<T, S>>
  >;
}

export type GeoNearSpecification<T extends object> = {
  distanceField: string;
  distanceMultiplier?: number;
  includeLocs?: string;
  key?: DeepKeyof<T>;
  maxDistance?: number;
  minDistance?: number;
  near: {
    type: 'Point';
    coordinates: [longitude: number, latitude: number];
  };
  query?: QueryPredicate<T>;
  spherical?: boolean;
};

export type GeoNearOutput<
  T extends object,
  S extends GeoNearSpecification<T>
> = Merge<
  T,
  {
    [K in S['distanceField']]: number;
  } & ('includeLocs' extends keyof S
    ? {
        [K in S['includeLocs'] & string]: S['key'] extends string
          ? DeepType<T, S['key']>
          : unknown;
      }
    : unknown)
>;
