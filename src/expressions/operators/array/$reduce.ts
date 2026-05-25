import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $reduce {
  $reduce: Signature;
}

interface Signature extends FunctionSignature {
  // TODO: implement correctly with aliases etc.
  arguments: [
    input: Const<{ input: unknown[]; initialValue: unknown; in: unknown }>
  ];
  return: this['arguments'][0]['in'];
}
