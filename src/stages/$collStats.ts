import { Aggregate } from '../aggregate';
import {
  AggregateState,
  MustBeFirstStage,
  WithType
} from '../types/aggregate-state';
import { AnyObject, EmptyObject } from '../types/object';

export interface $collStats<State extends AggregateState> {
  $collStats: MustBeFirstStage<
    State,
    <const S extends Specification>(
      specification: S
    ) => Aggregate<Output<State, S>>
  >;
}

interface Specification {
  latencyStats?: { histogram?: boolean };
  storageStats?: { scale?: number };
  count?: EmptyObject;
  queryExecStats?: EmptyObject;
}

type Output<State extends AggregateState, S extends Specification> = WithType<
  State,
  {
    ns: string;
    shard?: string;
    host: string;
    localTime: Date;
  } & MaybeLatencyStats<S> &
    MaybeStorageStats<S> &
    MaybeCount<S> &
    MaybeQueryExecStats<S>
>;

type Microseconds = number;
type LatencySubStats<S extends Specification['latencyStats']> = {
  latency: Microseconds;
  ops: number;
} & (NonNullable<S>['histogram'] extends true
  ? {
      histogram: {
        micros: number;
        count: number;
      }[];
    }
  : unknown);

type MaybeLatencyStats<S extends Specification> =
  undefined extends S['latencyStats']
    ? unknown
    : {
        latencyStats: {
          reads: LatencySubStats<S['latencyStats']>;
          writes: LatencySubStats<S['latencyStats']>;
          commands: LatencySubStats<S['latencyStats']>;
          transactions: LatencySubStats<S['latencyStats']>;
        };
      };

type MaybeStorageStats<S extends Specification> =
  undefined extends S['storageStats'] ? unknown : { storageStats: AnyObject };
type MaybeCount<S extends Specification> = undefined extends S['count']
  ? unknown
  : { count: number };
type MaybeQueryExecStats<S extends Specification> =
  undefined extends S['queryExecStats']
    ? unknown
    : {
        queryExecStats: {
          total: number;
          nonTailable: number;
        };
      };
