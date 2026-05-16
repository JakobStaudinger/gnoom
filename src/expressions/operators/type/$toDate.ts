import { FunctionSignature } from '../../../types/evaluate';

export interface $toDate {
  $toDate: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: Date;
}
