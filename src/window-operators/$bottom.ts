import { StaticInput } from '../expressions/static-input';
import { SortSpecification } from '../stages/$sort';
import { AggregateState } from '../types/aggregate-state';
import { FunctionSignature } from '../types/evaluate';

export interface $bottom<State extends AggregateState> {
  $bottom: Signature<State>;
}

interface Signature<State extends AggregateState> extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      sortBy: StaticInput<SortSpecification<State>>;
      output: unknown;
    }>
  ];
  return: this['arguments'][0]['output'];
}
