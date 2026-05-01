import { $getField } from './$getField';
import { $rand } from './$rand';
import { $toHashedIndexKey } from './$toHashedIndexKey';

export interface MiscellaneousOperators
  extends $getField, $rand, $toHashedIndexKey {}
