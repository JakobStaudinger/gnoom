import { Aggregate } from '../aggregate';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { AnyObject } from '../types/object';

export interface $planCacheStats<State extends AggregateState> {
  $planCacheStats: MustBeFirstStage<
    State,
    <const S extends Specification>(
      specification: S
    ) => Aggregate<Output<State>>
  >;
}

interface Specification {
  allHosts?: boolean;
}

type Output<State extends AggregateState> = AddStage<
  State,
  {
    T: {
      version: number;
      createdFromQuery: AnyObject;
      isActive: boolean;
      planCacheShapeHash: string;
      planCacheKey: string;
      cachedPlan: AnyObject;
      works: number;
      timeOfCreation: Date;
      creationExecStats: AnyObject[];
      candidatePlanScores: number[];
      indexFilterSet: boolean;
      estimatedSizeBytes: number;
      querySettings: {
        indexHints: {
          ns: { db: string; coll: string };
          allowedIndexes: string[];
        }[];
        queryFramework: 'classic' | 'sbe';
      };
      host: string;
      shard?: string;
    };
  }
>;
