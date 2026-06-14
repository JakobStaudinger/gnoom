import { AggregateState } from '../../types/aggregate-state';
import { DeepKeyof } from '../../types/deep';
import { ScoreAdjustment } from '../score/score';

export interface SpanOperator<State extends AggregateState> {
  span: PositionalOperator<State>;
}

type OperatorSpecification<State extends AggregateState> =
  | Partial<TermOperator<State>>
  | PositionalOperator<State>;

interface TermOperator<State extends AggregateState> {
  term: {
    path: DeepKeyof<State['T']>;
    query: string;
  };
}

interface PositionalOperators<State extends AggregateState>
  extends
    ContainsPositionalOperator<State>,
    FirstPositionalOperator<State>,
    NearPositionalOperator<State>,
    OrPositionalOperator<State>,
    SubtractPositionalOperator<State> {}

type PositionalOperator<State extends AggregateState> = Partial<
  PositionalOperators<State>
>;

interface ContainsPositionalOperator<State extends AggregateState> {
  contains: {
    spanToReturn: 'inner' | 'outer';
    little: OperatorSpecification<State>;
    big: OperatorSpecification<State>;
    score?: ScoreAdjustment<State>;
  };
}

interface FirstPositionalOperator<State extends AggregateState> {
  first: {
    endPositionLte?: number;
    operator: OperatorSpecification<State>;
    score?: ScoreAdjustment<State>;
  };
}

interface NearPositionalOperator<State extends AggregateState> {
  near: {
    clauses: OperatorSpecification<State>[];
    slop?: number;
    inOrder?: boolean;
    score?: ScoreAdjustment<State>;
  };
}

interface OrPositionalOperator<State extends AggregateState> {
  or: {
    clauses: OperatorSpecification<State>[];
    score?: ScoreAdjustment<State>;
  };
}

interface SubtractPositionalOperator<State extends AggregateState> {
  subtract: {
    include: OperatorSpecification<State>;
    exclude: OperatorSpecification<State>;
    score?: ScoreAdjustment<State>;
  };
}
