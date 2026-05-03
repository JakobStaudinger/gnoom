import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { AggregateState, WithType } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { Merge } from '../types/merge';
import { PipelineCallback } from '../types/pipeline';

export interface $lookup<State extends AggregateState> {
  $lookup: <Other extends object>() => <
    const S extends Specification<State, Other>
  >(
    specification: S
  ) => Aggregate<Output<State, Other, S>>;
}

interface RequiredLookupSpecificationFields {
  from: string;
  as: string;
}

type Specification<
  State extends AggregateState,
  Other extends object
> = RequiredLookupSpecificationFields &
  (
    | {
        localField: DeepKeyof<State['T']>;
        foreignField: DeepKeyof<Other>;
        pipeline?: PipelineCallback<Other>;
      }
    | {
        pipeline: PipelineCallback<Other>;
      }
  );

type Output<
  State extends AggregateState,
  Other extends object,
  S extends Specification<State, Other>
> = WithType<
  State,
  Merge<
    State['T'],
    {
      [K in S['as']]: 'pipeline' extends keyof S
        ? S['pipeline'] extends (
            ...args: infer _Args
          ) => AggregateLike<infer Output>
          ? Output['T'][]
          : never
        : Other[];
    }
  >
>;
