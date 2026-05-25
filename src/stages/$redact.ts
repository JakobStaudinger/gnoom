import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { GnoomError } from '../types/error';

export interface $redact<State extends AggregateState> {
  $redact: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
declare const DESCEND: unique symbol;
declare const PRUNE: unique symbol;
declare const KEEP: unique symbol;
/* eslint-enable @typescript-eslint/no-unused-vars */

type RedactState<State extends AggregateState> = Omit<
  State,
  'systemVariables'
> & {
  systemVariables: State['systemVariables'] & {
    DESCEND: typeof DESCEND;
    PRUNE: typeof PRUNE;
    KEEP: typeof KEEP;
  };
};

type Specification<State extends AggregateState> = AggregateExpression<
  RedactState<State>
>;

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: [EvaluateAggregateExpression<RedactState<State>, S>] extends [
      typeof DESCEND | typeof PRUNE | typeof KEEP
    ]
      ? Partial<State['T']>
      : GnoomError<{
          message: 'The expression given to $redact must evaluate to $$KEEP, $$PRUNE or $$DESCEND';
          actual: EvaluateAggregateExpression<RedactState<State>, S>;
        }>;
  }
>;
