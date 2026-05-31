import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { EvaluateQueryPredicate, QueryPredicate } from '../query-predicates';
import {
  AddStage,
  AggregateState,
  InitialState
} from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { Merge } from '../types/merge';
import { Simplify } from '../types/simplify';
import { WithoutFunctions } from '../types/without-functions';

export interface $graphLookup<State extends AggregateState> {
  $graphLookup: <Other extends object>() => <
    const S extends Specification<State, WithoutFunctions<Other>>
  >(
    specification: S
  ) => Aggregate<Simplify<Output<State, WithoutFunctions<Other>, S>>>;
}

interface Specification<State extends AggregateState, Other extends object> {
  from: string;
  startWith: AggregateExpression<State>;
  connectFromField: DeepKeyof<Other>;
  connectToField: DeepKeyof<Other>;
  as: string;
  maxDepth?: number;
  depthField?: string;
  restrictSearchWithMatch?: QueryPredicate<InitialState<Other>>;
}

type Output<
  State extends AggregateState,
  Other extends object,
  S extends Specification<State, Other>
> = AddStage<
  State,
  {
    T: Merge<
      State['T'],
      {
        [K in S['as']]: S['restrictSearchWithMatch'] extends QueryPredicate<
          InitialState<Other>
        >
          ? EvaluateQueryPredicate<
              InitialState<Other>,
              S['restrictSearchWithMatch']
            >[]
          : Other[];
      } & ('depthField' extends keyof S
        ? {
            [K in S['depthField'] & string]: number;
          }
        : unknown)
    >;
  }
>;
