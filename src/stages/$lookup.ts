import { Aggregate, AggregatePipeline } from '../aggregate';
import { DeepKeyof } from '../types/deep-keyof';

export interface LookupStage<T extends object> {
  $lookup: <Other extends object>() => <
    const S extends LookupSpecification<T, Other> = LookupSpecification<
      T,
      Other
    >
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
        pipeline?: AggregatePipeline<unknown>;
      }
    | {
        pipeline: AggregatePipeline<unknown>;
      }
  );

export type LookupOutput<
  T extends object,
  Other extends object,
  S extends LookupSpecification<T, Other>
> = T & {
  [K in S['as']]: 'pipeline' extends keyof S
    ? S['pipeline'] extends AggregatePipeline<infer Output>
      ? Output[]
      : never
    : Other[];
};
