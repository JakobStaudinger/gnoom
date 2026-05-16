import { FunctionSignature } from '../../../types/evaluate';

export interface $indexOfArray {
  $indexOfArray: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    haystack: unknown[],
    needle: unknown,
    start?: number,
    end?: number
  ];
  return: number;
}
