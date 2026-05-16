import { FunctionSignature } from '../../../types/evaluate';

export interface $anyElementTrue {
  $anyElementTrue: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [values: unknown[]];
  return: boolean;
}
