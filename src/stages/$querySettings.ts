import { Aggregate } from '../aggregate';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { AnyObject } from '../types/object';

export interface $querySettings<State extends AggregateState> {
  $querySettings: MustBeFirstStage<
    State,
    <const S extends Specification>(
      specification: S
    ) => Aggregate<Output<State, S>>
  >;
}

interface Specification {
  showDebugQueryShape?: boolean;
}

type Output<State extends AggregateState, S extends Specification> = AddStage<
  State,
  {
    T: {
      queryShapeHash: string;
      settings: {
        indexHints: {
          ns: { db: string; coll: string };
          allowedIndexes: string[];
        }[];
        queryFramework: 'classic' | 'sbe';
        comment?: string;
      };
      representativeQuery: AnyObject;
    } & (S['showDebugQueryShape'] extends true
      ? { debugQueryShape: AnyObject }
      : unknown);
  }
>;
