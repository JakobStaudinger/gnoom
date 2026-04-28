import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { DeepKeyof } from '../types/deep';
import { PipelineCallback } from '../types/pipeline';

export interface LookupStage<T extends object> {
  $lookup: <Other extends object>() => <
    const S extends LookupSpecification<T, Other>
  >(
    specification: S
  ) => Aggregate<LookupOutput<T, Other, S>>;
}

interface RequiredLookupSpecificationFields {
  from: string;
  as: string;
}

export type LookupSpecification<
  T extends object,
  Other extends object
> = RequiredLookupSpecificationFields &
  (
    | {
        localField: DeepKeyof<T>;
        foreignField: DeepKeyof<Other>;
        pipeline?: PipelineCallback<Other>;
      }
    | {
        pipeline: PipelineCallback<Other>;
      }
  );

export type LookupOutput<
  T extends object,
  Other extends object,
  S extends LookupSpecification<T, Other>
> = T & {
  [K in S['as']]: 'pipeline' extends keyof S
    ? S['pipeline'] extends (
        ...args: infer _Args
      ) => AggregateLike<infer Output>
      ? Output[]
      : never
    : Other[];
};
