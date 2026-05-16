import { FunctionSignature } from '../../../types/evaluate';

export interface $add {
  $add: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | Date, y: number, ...others: number[]];
  return: this['arguments'][0] extends number ? number : Date;
}
