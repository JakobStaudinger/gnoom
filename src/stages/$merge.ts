import { Aggregate } from '../aggregate';
import { AggregateState, Finalize } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { AnyObject, EmptyObject } from '../types/object';
import { PipelineCallback } from '../types/pipeline';

export interface MergeStage<T extends object, State extends AggregateState> {
  $merge: <Other extends object>() => <
    const S extends MergeSpecification<T, Other>
  >(
    specification: S
  ) => Aggregate<EmptyObject, Finalize<State, '$merge'>>;
}

type MergeSpecification<T extends object, Other extends object> =
  | string
  | {
      into: string | { db: string; coll: string };
      on?:
        | (DeepKeyof<T> & DeepKeyof<Other>)
        | (DeepKeyof<T> & DeepKeyof<Other>)[];
      let?: AnyObject;
      whenMatched?:
        | 'merge'
        | 'replace'
        | 'keepExisting'
        | 'fail'
        | PipelineCallback<Other>;
      whenNotMatched?: 'insert' | 'discard' | 'fail';
    };
