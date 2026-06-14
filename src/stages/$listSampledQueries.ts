import { UUID } from 'mongodb';
import { Aggregate } from '../aggregate';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { AnyObject } from '../types/object';

export interface $listSampledQueries<State extends AggregateState> {
  $listSampledQueries: MustBeFirstStage<
    State,
    <const S extends Specification>(
      specification: S
    ) => Aggregate<Output<State>>
  >;
}

interface Specification {
  namespace?: string;
}

type Output<State extends AggregateState> = AddStage<
  State,
  {
    T: {
      _id: UUID;
      ns: string;
      collectionUuid: UUID;
      cmdName:
        | 'find'
        | 'aggregate'
        | 'count'
        | 'distinct'
        | 'update'
        | 'delete'
        | 'findAndModify';
      cmd: AnyObject;
      expireAt: Date;
    };
  }
>;
