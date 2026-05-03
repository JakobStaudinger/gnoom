import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { QueryPredicate } from '../query-predicates';
import { AggregateState, WithType } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { Merge } from '../types/merge';

export interface $graphLookup<State extends AggregateState> {
  $graphLookup: <Other extends object>() => <
    const S extends Specification<State, Other>
  >(
    specification: S
  ) => Aggregate<Output<State, Other, S>>;
}

interface Specification<State extends AggregateState, Other extends object> {
  from: string;
  startWith: AggregateExpression<State>;
  connectFromField: DeepKeyof<Other>;
  connectToField: DeepKeyof<Other>;
  as: string;
  maxDepth?: number;
  depthField?: string;
  restrictSearchWithMatch?: QueryPredicate<Other>;
}

type Output<
  State extends AggregateState,
  Other extends object,
  S extends Specification<State, Other>
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
