import { FunctionSignature } from '../../../types/evaluate';

export interface $subtract {
  $subtract: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | Date, y: number] | [x: Date, y: Date];
  return: this['arguments'][0] extends Date
    ? this['arguments'][1] extends Date
      ? number
      : Date
    : number;
}
