import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { PipelineCallback } from '../types/pipeline';
import { Simplify } from '../types/simplify';

export interface $rankFusion<State extends AggregateState> {
  $rankFusion: <
    const PipelineNames extends string,
    const S extends Specification<State, PipelineNames>
  >(
    specification: S & {
      input: {
        pipelines: Record<PipelineNames, PipelineCallback<State['T']>>;
      };
    }
  ) => Aggregate<Simplify<Output<State>>>;
}

type Specification<
  State extends AggregateState,
  PipelineNames extends string
> = {
  input: {
    pipelines: Record<PipelineNames, PipelineCallback<State['T']>>;
  };
  combination?: {
    weights: Record<PipelineNames, AggregateExpression<State>>;
  };
  scoreDetails?: boolean;
};

type Output<State extends AggregateState> = AddStage<State, { T: State['T'] }>;
