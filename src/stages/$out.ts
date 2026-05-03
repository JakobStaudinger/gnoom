import { Aggregate } from '../aggregate';
import { AggregateState, Finalize, WithType } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { AnyObject } from '../types/object';
import { PipelineCallback } from '../types/pipeline';

export interface $out<State extends AggregateState> {
  $out: <Other extends object>() => <
    const S extends Specification<State, Other>
  >(
    specification: S
  ) => Aggregate<Finalize<WithType<State, never>, '$out'>>;
}

type Specification<State extends AggregateState, Other extends object> =
  | string
  | {
      into: string | { db: string; coll: string };
      on?:
        | (DeepKeyof<State['T']> & DeepKeyof<Other>)
        | (DeepKeyof<State['T']> & DeepKeyof<Other>)[];
      let?: AnyObject;
      whenMatched?:
        | 'out'
        | 'replace'
        | 'keepExisting'
        | 'fail'
        | PipelineCallback<Other>;
      whenNotMatched?: 'insert' | 'discard' | 'fail';
    };
