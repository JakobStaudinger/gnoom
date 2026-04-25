import { $getField } from './$getField';
import { $rand } from './$rand';
import { $toHashedIndexKey } from './$toHashedIndexKey';

export interface MiscellaneousOperatorMap
  extends $getField, $rand, $toHashedIndexKey {}
