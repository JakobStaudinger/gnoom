import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { AggregateState, WithType } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { Merge } from '../types/merge';
import { AnyObject } from '../types/object';
import { PipelineCallback } from '../types/pipeline';
import { WithoutFunctions } from '../types/without-functions';

export interface $lookup<State extends AggregateState> {
  $lookup: <Other extends object>() => <
    const Variables extends AnyObject,
    const S extends Specification<State, WithoutFunctions<Other>, Variables>
  >(
    specification: S & {
      let?: Variables;
    }
  ) => Aggregate<Output<State, WithoutFunctions<Other>, Variables, S>>;
}

interface RequiredLookupSpecificationFields {
  from: string;
  as: string;
}

type Specification<
  State extends AggregateState,
  Other extends object,
  Variables extends AnyObject
> = RequiredLookupSpecificationFields &
  (
    | {
        localField: DeepKeyof<State['T']>;
        foreignField: DeepKeyof<Other>;
        let?: Variables;
        pipeline?: PipelineCallback<Other, Variables>;
      }
    | {
        let?: Variables;
        pipeline: PipelineCallback<Other, Variables>;
      }
  );

type Output<
  State extends AggregateState,
  Other extends object,
  Variables extends AnyObject,
  S extends Specification<State, Other, Variables>
> = WithType<
  State,
  Merge<
    State['T'],
    {
      [K in S['as']]: 'pipeline' extends keyof S
        ? S['pipeline'] extends (...args: infer _Args) => AggregateLike<infer O>
          ? O['T'][]
          : never
        : Other[];
    }
  >
>;
