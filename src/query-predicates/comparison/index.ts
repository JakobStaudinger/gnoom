import { $eq } from './$eq';
import { $ne } from './$ne';
import { $in } from './$in';
import { $nin } from './$nin';
import { $gt } from './$gt';
import { $gte } from './$gte';
import { $lt } from './$lt';
import { $lte } from './$lte';

export interface ComparisonQueryPredicate<T>
  extends $eq<T>, $ne<T>, $in<T>, $nin<T>, $gt<T>, $gte<T>, $lt<T>, $lte<T> {}
