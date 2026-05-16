import { FunctionSignature } from '../../../types/evaluate';

export interface $arrayToObject {
  $arrayToObject: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [array: [key: PropertyKey, value: unknown][]];
  return: Record<
    this['arguments'][0][number][0],
    this['arguments'][0][number][1]
  >;
}
