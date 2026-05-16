import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $reduce {
  $reduce: Signature;
}

interface Signature extends FunctionSignature {
  // TODO: implement correctly with aliases etc.
  arguments: [
    input: StaticInput<{ input: unknown[]; initialValue: unknown; in: unknown }>
  ];
  return: this['arguments'][0]['in'];
}
