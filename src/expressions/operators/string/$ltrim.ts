import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $ltrim {
  $ltrim: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: string; chars?: string }>];
  return: string;
}
