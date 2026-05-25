import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $trim {
  $trim: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: string; chars?: string }>];
  return: string;
}
