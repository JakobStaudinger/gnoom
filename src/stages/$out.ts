import { Aggregate } from '../aggregate';
import { AggregateState, Finalize } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { AnyObject } from '../types/object';
import { PipelineCallback } from '../types/pipeline';

export interface OutStage<T extends object, State extends AggregateState> {
  $out: <Other extends object>() => <
    const S extends OutSpecification<T, Other>
  >(
    specification: S
  ) => Aggregate<never, Finalize<State, '$out'>>;
}

type OutSpecification<T extends object, Other extends object> =
  | string
  | {
      into: string | { db: string; coll: string };
      on?:
        | (DeepKeyof<T> & DeepKeyof<Other>)
        | (DeepKeyof<T> & DeepKeyof<Other>)[];
      let?: AnyObject;
      whenMatched?:
        | 'out'
        | 'replace'
        | 'keepExisting'
        | 'fail'
        | PipelineCallback<Other>;
      whenNotMatched?: 'insert' | 'discard' | 'fail';
    };
