import { Aggregate } from '../aggregate';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { AnyObject } from '../types/object';

export interface $listClusterCatalog<State extends AggregateState> {
  $listClusterCatalog: MustBeFirstStage<
    State,
    <const S extends Specification>(
      specification: S
    ) => Aggregate<Output<State, S>>
  >;
}

interface Specification {
  shards?: boolean;
  balancingConfiguration?: boolean;
}

type Output<State extends AggregateState, S extends Specification> = AddStage<
  State,
  {
    T: {
      ns: string;
      db: string;
      type: 'collection' | 'view' | 'timeseries';
      idIndex?: AnyObject;
      options: AnyObject;
      info: AnyObject;
      sharded: boolean;
      shardKey?: AnyObject;
    } & (S['shards'] extends true ? { shards?: string[] } : unknown) &
      (S['balancingConfiguration'] extends true
        ? {
            balancingEnabled?: boolean;
            balancingEnabledReason?: {
              enableBalancing: boolean;
              allowMigrations: boolean;
            };
            autoMergingEnabled?: boolean;
            chunkSize?: number;
          }
        : unknown);
  }
>;
