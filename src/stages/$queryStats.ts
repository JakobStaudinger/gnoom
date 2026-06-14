import { Aggregate } from '../aggregate';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { AnyObject } from '../types/object';

export interface $queryStats<State extends AggregateState> {
  $queryStats: MustBeFirstStage<
    State,
    <const S extends Specification>(
      specification: S
    ) => Aggregate<Output<State>>
  >;
}

interface Specification {
  transformIdentifiers?: {
    algorithm: string;
    hmacKey: unknown;
  };
}

type Output<State extends AggregateState> = AddStage<
  State,
  {
    T: {
      key: {
        queryShape: AnyObject;
        client: {
          application: AnyObject;
          driver: {
            name: string;
            version: string;
          };
          os: {
            type: string;
            name: string;
            architecture: string;
            version: string;
          };
        };
        readConcern: AnyObject;
        collectionType:
          | 'changeStream'
          | 'collection'
          | 'nonExistent'
          | 'timeseries'
          | 'view'
          | 'virtual';
        hint: AnyObject | string;
        batchSize: string;
        comment: string;
        maxTimeMS: string;
        noCursorTimeout: boolean;
        readPreference: string;
        apiVersion: string;
        apiStrict: boolean;
        apiDeprecationErrors: boolean;
      };
      keyHash: string;
      queryShapeHash: string;
      metrics: {
        lastExecutionMicros: number;
        execCount: number;
        keysExamined: {
          sum: number;
          max: number;
          min: number;
          sumOfSquares: number;
        };
        docsExamined: {
          sum: number;
          max: number;
          min: number;
          sumOfSquares: number;
        };
        hasSortStage: {
          true: number;
          false: number;
        };
        usedDisk: {
          true: number;
          false: number;
        };
        fromMultiPlanner: {
          true: number;
          false: number;
        };
        fromPlanCache: {
          true: number;
          false: number;
        };
        totalExecMicros: {
          sum: number;
          max: number;
          min: number;
          sumOfSquares: number;
        };
        firstResponseExecMicros: {
          sum: number;
          max: number;
          min: number;
          sumOfSquares: number;
        };
        docsReturned: {
          sum: number;
          max: number;
          min: number;
          sumOfSquares: number;
        };
        firstSeenTimestamp: Date;
        latestSeenTimestamp: Date;
        workingTimeMillis: number;
        delinquentAcquisitions: number;
        totalAcquisitionDelinquencyMillis: number;
        maxAcquisitionDelinquencyMillis: number;
        costBasedRanker: {
          nDocsSampled: {
            sum: number;
            max: number;
            min: number;
            sumOfSquares: number;
          };
          cardinalityEstimationMethods: {
            Histogram: number;
            Sampling: number;
            Heuristics: number;
            Mixed: number;
            Metadata: number;
            Code: number;
          };
        };
        cpuNanos: {
          sum: number;
          max: number;
          min: number;
          sumOfSquares: number;
        };
        planningTimeMicros: {
          sum: number;
          max: number;
          min: number;
          sumOfSquares: number;
        };
        numInterruptChecksPerSec: number;
        overdueInterruptApproxMaxMillis: number;
      };
    };
  }
>;
