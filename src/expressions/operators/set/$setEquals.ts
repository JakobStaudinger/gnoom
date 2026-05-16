import { FunctionSignature } from '../../../types/evaluate';

export interface $setEquals {
  $setEquals: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: unknown[], y: unknown[], ...values: unknown[][]];
  return: boolean;
}
