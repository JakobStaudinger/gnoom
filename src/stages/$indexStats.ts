import { Aggregate } from '../aggregate';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { AnyObject, EmptyObject } from '../types/object';

export interface $indexStats<State extends AggregateState> {
  $indexStats: MustBeFirstStage<
    State,
    (specification: EmptyObject) => Aggregate<Output<State>>
  >;
}

type Output<State extends AggregateState> = AddStage<
  State,
  {
    T: {
      name: string;
      key: AnyObject;
      host: string;
      accesses: { ops: number; since: Date };
      shard?: string;
      building?: true;
      spec?: {
        v: number;
        name: string;
        key: AnyObject;
      };
    };
  }
>;
