import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { QueryPredicate } from '../query-predicates';
import { AggregateState, WithType } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { Merge } from '../types/merge';

export interface GraphLookupStage<State extends AggregateState> {
  $graphLookup: <Other extends object>() => <
    const S extends GraphLookupSpecification<State, Other>
  >(
    specification: S
  ) => Aggregate<GraphLookupOutput<State, Other, S>>;
}

interface GraphLookupSpecification<
  State extends AggregateState,
  Other extends object
> {
  from: string;
  startWith: AggregateExpression<State>;
  connectFromField: DeepKeyof<Other>;
  connectToField: DeepKeyof<Other>;
  as: string;
  maxDepth?: number;
  depthField?: string;
  restrictSearchWithMatch?: QueryPredicate<Other>;
}

type GraphLookupOutput<
  State extends AggregateState,
  Other extends object,
  S extends GraphLookupSpecification<State, Other>
> = WithType<
  State,
  Merge<
    State['T'],
    {
      [K in S['as']]: Other[];
    } & ('depthField' extends keyof S
      ? {
          [K in S['depthField'] & string]: number;
        }
      : unknown)
  >
>;
