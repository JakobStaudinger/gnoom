import { Aggregate } from '../aggregate';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { EmptyObject } from '../types/object';

export interface $shardedDataDistribution<State extends AggregateState> {
  $shardedDataDistribution: MustBeFirstStage<
    State,
    (specification: EmptyObject) => Aggregate<Output<State>>
  >;
}

type Output<State extends AggregateState> = AddStage<
  State,
  {
    T: {
      ns: string;
      shards: {
        shardName: string;
        numOrphanedDocs: number;
        numOwnedDocuments: number;
        ownedSizeBytes: number;
        orphanedSizeBytes: number;
      }[];
    };
  }
>;
