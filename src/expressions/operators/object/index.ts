import { $mergeObjects } from './$mergeObjects';
import { $objectToArray } from './$objectToArray';
import { $setField } from './$setField';
import { $unsetField } from './$unsetField';

export interface ObjectOperators
  extends $mergeObjects, $objectToArray, $setField, $unsetField {}
