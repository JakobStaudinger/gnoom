import { $cmp } from './$cmp';
import { $eq } from './$eq';
import { $gt } from './$gt';
import { $gte } from './$gte';
import { $lt } from './$lt';
import { $lte } from './$lte';
import { $ne } from './$ne';

export interface ComparisonOperatorMap
  extends $cmp, $eq, $gt, $gte, $lt, $lte, $ne {}
