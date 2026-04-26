export interface AggregateState {
  hasStage: boolean;
  isNestedPipeline: boolean;
  finalStage?: string;
}

export type UnlessFinalized<
  State extends AggregateState,
  T
> = State['finalStage'] extends string
  ? (
      error: `${State['finalStage']} must be the last stage in a pipeline.`
    ) => never
  : T;

export type MustBeFirstStage<
  State extends AggregateState,
  T
> = State['hasStage'] extends true
  ? (error: 'Must be the first stage in a pipeline') => never
  : T;

export type NotInNestedPipelines<
  State extends AggregateState,
  T
> = State['isNestedPipeline'] extends true
  ? (error: 'Cannot use in sub-pipelines') => never
  : T;

export type Finalize<State extends AggregateState, Stage extends string> = Omit<
  State,
  'finalStage'
> & { finalStage: Stage };

export type InitialState = { hasStage: false; isNestedPipeline: false };

export type NestedPipelineState = { hasStage: false; isNestedPipeline: true };
