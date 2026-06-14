import { FunctionSignature } from '../../../types/evaluate';
import { AnyObject } from '../../../types/object';
import { Const } from '../../const';

export interface $meta {
  $meta: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [keyword: Const<keyof MetaVariables>];
  return: this['arguments'][0] extends Const<
    infer Key extends keyof MetaVariables
  >
    ? MetaVariables[Key]
    : never;
}

interface MetaVariables {
  textScore: number;
  indexKey: AnyObject | undefined;
  score: number;
  scoreDetails: ScoreDetails;
  searchScore: number;
  searchHighlights: SearchHighlight[];
  searchSequenceToken: string;
  searchScoreDetails: SearchScoreDetails;
  searchRootDocumentId: unknown;
  vectorSearchScore: number;
}

interface ScoreDetails {
  value?: number;
  description?: string;
  details?: ScoreDetails[];
  [extra: string]: unknown;
}

interface SearchScoreDetails {
  value: number;
  description: string;
  details: SearchScoreDetails[];
}

interface SearchHighlight {
  path: string;
  score?: number;
  texts: {
    type: 'hit' | 'text';
    value: string;
  }[];
}
