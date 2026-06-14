import { Aggregate } from '../aggregate';
import {
  AddStage,
  AggregateState,
  MustBeFirstStage
} from '../types/aggregate-state';
import { EmptyObject } from '../types/object';

export interface $listSessions<State extends AggregateState> {
  $listSessions: MustBeFirstStage<
    State,
    <const S extends Specification>(
      specification: S
    ) => Aggregate<Output<State>>
  >;
}

type Specification =
  | EmptyObject
  | { users: { user: string; db: string }[] }
  | { allUsers: true };

type Output<State extends AggregateState> = AddStage<
  State,
  {
    T: {
      user: {
        name: string;
      };
      lastUse: Date;
    };
  }
>;
