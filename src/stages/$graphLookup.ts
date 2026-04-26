import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { QueryPredicate } from '../query-predicates';
import { DeepKeyof } from '../types/deep';
import { Merge } from '../types/merge';

export interface GraphLookupStage<T extends object> {
  $graphLookup: <Other extends object>() => <
    const S extends GraphLookupSpecification<T, Other>
  >(
    specification: S
  ) => Aggregate<GraphLookupOutput<T, Other, S>>;
}

export interface GraphLookupSpecification<
  T extends object,
  Other extends object
> {
  from: string;
  startWith: AggregateExpression<T>;
  connectFromField: DeepKeyof<Other>;
  connectToField: DeepKeyof<Other>;
  as: string;
  maxDepth?: number;
  depthField?: string;
  restrictSearchWithMatch?: QueryPredicate<Other>;
}

export type GraphLookupOutput<
  T extends object,
  Other extends object,
  S extends GraphLookupSpecification<T, Other>
> = Merge<
  T,
  {
    [K in S['as']]: Other[];
  } & ('depthField' extends keyof S
    ? {
        [K in S['depthField'] & string]: number;
      }
    : unknown)
>;
