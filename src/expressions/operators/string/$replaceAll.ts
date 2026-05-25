import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $replaceAll {
  $replaceAll: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: string;
      find: string;
      replacement: string;
    }>
  ];
  return: string;
}
