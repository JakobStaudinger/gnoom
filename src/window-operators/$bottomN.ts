import { Const } from '../expressions/const';
import { SortSpecification } from '../stages/$sort';
import { AggregateState } from '../types/aggregate-state';
import { FunctionSignature } from '../types/evaluate';

export interface $bottomN<State extends AggregateState> {
  $bottomN: Signature<State>;
}

interface Signature<State extends AggregateState> extends FunctionSignature {
  arguments: [
    input: Const<{
      n: number;
      sortBy: Const<SortSpecification<State>>;
      output: unknown;
    }>
  ];
  return: this['arguments'][0]['output'][];
}
