import { Aggregate } from '../aggregate';
import { EvaluateQueryPredicate, QueryPredicate } from '../query-predicates';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { DeepKeyof, DeepType } from '../types/deep';
import { Merge } from '../types/merge';
import { Simplify } from '../types/simplify';

export interface $geoNear<State extends AggregateState> {
  $geoNear: MustBeFirstStage<
    State,
    <const S extends Specification<State>>(
      specification: S
    ) => Aggregate<Simplify<Output<State, S>>>
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
    coordinates: [longitude: number, latitude: number] | number[];
  };
  query?: QueryPredicate<State>;
  spherical?: boolean;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: Merge<
      S['query'] extends QueryPredicate<State>
        ? EvaluateQueryPredicate<State, S['query']>
        : State['T'],
      {
        [K in S['distanceField']]: number;
      } & ('includeLocs' extends keyof S
        ? {
            [K in S['includeLocs'] & string]: S['key'] extends string
              ? DeepType<State, S['key']>
              : unknown;
          }
        : unknown)
    >;
  }
>;
