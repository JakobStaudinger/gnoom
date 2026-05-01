import { Aggregate } from '../aggregate';
import { AggregateState, Finalize, WithType } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { AnyObject } from '../types/object';
import { PipelineCallback } from '../types/pipeline';

export interface MergeStage<State extends AggregateState> {
  $merge: <Other extends object>() => <
    const S extends MergeSpecification<State, Other>
  >(
    specification: S
  ) => Aggregate<Finalize<WithType<State, never>, '$merge'>>;
}

type MergeSpecification<State extends AggregateState, Other extends object> =
  | string
  | {
      into: string | { db: string; coll: string };
      on?:
        | (DeepKeyof<State['T']> & DeepKeyof<Other>)
        | (DeepKeyof<State['T']> & DeepKeyof<Other>)[];
      let?: AnyObject;
      whenMatched?:
        | 'merge'
        | 'replace'
        | 'keepExisting'
        | 'fail'
        | PipelineCallback<Other>;
      whenNotMatched?: 'insert' | 'discard' | 'fail';
    };
