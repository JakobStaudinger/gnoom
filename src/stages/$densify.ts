import { Aggregate } from '../aggregate';
import { TimeUnit } from '../expressions/operators/date/types';
import { AggregateState, WithType } from '../types/aggregate-state';
import { DeepKeyof, DeepPartial, DeepType, FromDeepEntry } from '../types/deep';
import { Merge } from '../types/merge';

export interface $densify<State extends AggregateState> {
  $densify: <
    const F extends DeepKeyof<State['T']>,
    const P extends DeepKeyof<State['T']>,
    const S extends Specification<State, F>
  >(
    specification: S & {
      field: F;
      partitionByFields?: P[];
    }
  ) => Aggregate<Output<State, F, P>>;
}

interface Specification<
  State extends AggregateState,
  F extends DeepKeyof<State['T']>
> {
  field: F;
  partitionByFields?: DeepKeyof<State['T']>[];
  range: {
    bounds:
      | 'full'
      | 'partition'
      | [lower: DeepType<State['T'], F>, upper: DeepType<State['T'], F>];
    step: number;
  } & (DeepType<State['T'], F> extends Date ? { unit: TimeUnit } : unknown);
}

type Output<
  State extends AggregateState,
  F extends DeepKeyof<State['T']>,
  P extends DeepKeyof<State['T']>
> =
  DeepType<State['T'], F> extends Date | number | undefined | null
    ? WithType<
        State,
        Merge<
          DeepPartial<State['T']>,
          UnionToIntersection<
            F | P extends infer K
              ? K extends string
                ? FromDeepEntry<K, NonNullable<DeepType<State['T'], K>>>
                : never
              : never
          >
        >
      >
    : never;

type UnionToIntersection<U> = (
  U extends unknown ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;
