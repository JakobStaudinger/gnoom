import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { GnoomError } from '../types/error';
import { PipelineCallback } from '../types/pipeline';
import { Simplify } from '../types/simplify';

export interface $scoreFusion<State extends AggregateState> {
  $scoreFusion: <
    const PipelineNames extends string,
    const S extends Specification<State, PipelineNames>
  >(
    specification: S & {
      input: {
        pipelines: Record<PipelineNames, PipelineCallback<State['T']>>;
      };
    }
  ) => Aggregate<Simplify<Output<State, PipelineNames, S>>>;
}

type Specification<
  State extends AggregateState,
  PipelineNames extends string
> = {
  input: {
    pipelines: Record<PipelineNames, PipelineCallback<State['T']>>;
    normalization?: 'none' | 'sigmoid' | 'minMaxScaler';
  };
  combination?:
    | {
        method?: 'avg';
        weights?: Record<PipelineNames, AggregateExpression<State>>;
      }
    | {
        method: 'expression';
        expression: AggregateExpression<
          CombinationExpressionState<State, PipelineNames>
        >;
      };
  scoreDetails?: boolean;
};

type CombinationExpressionState<
  State extends AggregateState,
  PipelineNames extends string
> = Omit<State, 'systemVariables'> & {
  systemVariables: State['systemVariables'] & {
    [K in PipelineNames]: number;
  };
};

type Output<
  State extends AggregateState,
  PipelineNames extends string,
  S extends Specification<State, PipelineNames>
> = AddStage<
  State,
  {
    T: State['T'] &
      (S['combination'] extends { expression: infer E }
        ? EvaluateAggregateExpression<
            CombinationExpressionState<State, PipelineNames>,
            E
          > extends infer Eval
          ? Eval extends GnoomError<infer _>
            ? { _error: Eval }
            : Eval extends number
              ? unknown
              : {
                  _error: GnoomError<{
                    message: 'combination.expression must evaluate to a number';
                  }>;
                }
          : unknown
        : unknown);
  }
>;
