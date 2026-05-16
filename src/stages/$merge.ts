import { Aggregate } from '../aggregate';
import { AggregateState, Finalize, WithType } from '../types/aggregate-state';
import { DeepKeyof } from '../types/deep';
import { AnyObject } from '../types/object';
import { PipelineCallback } from '../types/pipeline';

export interface $merge<State extends AggregateState> {
  $merge: <Other extends object>() => <
    const Variables extends AnyObject,
    const S extends Specification<State, Other, Variables>
  >(
    specification: S & {
      let?: Variables;
    }
  ) => Aggregate<Finalize<WithType<State, never>, '$merge'>>;
}

type Specification<
  State extends AggregateState,
  Other extends object,
  Variables extends AnyObject
> =
  | string
  | {
      into: string | { db: string; coll: string };
      on?:
        | (DeepKeyof<State['T']> & DeepKeyof<Other>)
        | (DeepKeyof<State['T']> & DeepKeyof<Other>)[];
      let?: Variables;
      whenMatched?:
        | 'merge'
        | 'replace'
        | 'keepExisting'
        | 'fail'
        | PipelineCallback<Other, Variables>;
      whenNotMatched?: 'insert' | 'discard' | 'fail';
    };
