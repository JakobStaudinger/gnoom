import { $arrayElemAt } from './$arrayElemAt';
import { $arrayToObject } from './$arrayToObject';
import { $concatArrays } from './$concatArrays';
import { $filter } from './$filter';
import { $firstN } from './$firstN';
import { $in } from './$in';
import { $indexOfArray } from './$indexOfArray';
import { $isArray } from './$isArray';
import { $lastN } from './$lastN';
import { $map } from './$map';
import { $maxN } from './$maxN';
import { $minN } from './$minN';
import { $range } from './$range';
import { $reduce } from './$reduce';
import { $reverseArray } from './$reverseArray';
import { $size } from './$size';
import { $slice } from './$slice';
import { $sortArray } from './$sortArray';
import { $zip } from './$zip';

export interface ArrayOperatorMap
  extends
    $arrayElemAt,
    $arrayToObject,
    $concatArrays,
    $filter,
    $firstN,
    $in,
    $indexOfArray,
    $isArray,
    $lastN,
    $map,
    $maxN,
    $minN,
    $range,
    $reduce,
    $reverseArray,
    $size,
    $slice,
    $sortArray,
    $zip {}
