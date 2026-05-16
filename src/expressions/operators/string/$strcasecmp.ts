import { FunctionSignature } from '../../../types/evaluate';

export interface $strcasecmp {
  $strcasecmp: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: string, y: string];
  return: -1 | 0 | 1;
}
