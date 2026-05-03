import { Aggregate } from '../aggregate';
import { QueryPredicate } from '../query-predicates';
import {
  AggregateState,
  MustBeFirstStage,
  WithType
} from '../types/aggregate-state';
import { DeepKeyof, DeepType } from '../types/deep';
import { Merge } from '../types/merge';

export interface $geoNear<State extends AggregateState> {
  $geoNear: MustBeFirstStage<
    State,
    <const S extends Specification<State>>(
      specification: S
    ) => Aggregate<Output<State, S>>
  >;
}

type Specification<State extends AggregateState> = {
  distanceField: string;
  distanceMultiplier?: number;
  includeLocs?: string;
  key?: DeepKeyof<State['T']>;
  maxDistance?: number;
  minDistance?: number;
  near: {
    type: 'Point';
    coordinates: [longitude: number, latitude: number];
  };
  query?: QueryPredicate<State['T']>;
  spherical?: boolean;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<
  State,
  Merge<
    State['T'],
    {
      [K in S['distanceField']]: number;
    } & ('includeLocs' extends keyof S
      ? {
          [K in S['includeLocs'] & string]: S['key'] extends string
            ? DeepType<State, S['key']>
            : unknown;
        }
      : unknown)
  >
>;
