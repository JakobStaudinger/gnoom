import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { EmptyObject } from '../types/object';
import { PipelineCallback } from '../types/pipeline';
import { WithoutFunctions } from '../types/without-functions';

export interface $out<State extends AggregateState> {
  $out: <Other extends object>() => <
    const S extends Specification<State, WithoutFunctions<Other>, Variables>,
    const Variables extends Record<string, AggregateExpression<State>> =
      EmptyObject
  >(
    specification: S & {
      let?: Variables;
    }
  ) => Aggregate<Output<State>>;
}

type Specification<
  State extends AggregateState,
  Other extends object,
  Variables extends Record<string, AggregateExpression<State>>
> =
  | string
  | {
      into: string | { db: string; coll: string };
      on?:
        | (DeepKeyof<State['T']> & DeepKeyof<Other>)
        | (DeepKeyof<State['T']> & DeepKeyof<Other>)[];
      let?: Variables;
      whenMatched?:
        | 'out'
        | 'replace'
        | 'keepExisting'
        | 'fail'
        | PipelineCallback<
            Other,
            Variables extends EmptyObject
              ? { new: State['T'] }
              : {
                  -readonly [K in keyof Variables]: EvaluateAggregateExpression<
                    State,
                    Variables[K]
                  >;
                }
          >;
      whenNotMatched?: 'insert' | 'discard' | 'fail';
    };

type Output<State extends AggregateState> = AddStage<
  State,
  { T: EmptyObject; finalStage: '$out' }
>;
