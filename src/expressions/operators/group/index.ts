import { $avg } from './$avg';
import { $max } from './$max';
import { $median } from './$median';
import { $min } from './$min';
import { $percentile } from './$percentile';
import { $stdDevPop } from './$stdDevPop';
import { $stdDevSamp } from './$stdDevSamp';

export interface GroupOperators
  extends $avg, $max, $median, $min, $percentile, $stdDevPop, $stdDevSamp {}
