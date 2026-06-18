import { $arrayElemAt } from './$arrayElemAt';
import { $arrayToObject } from './$arrayToObject';
import { $concatArrays } from './$concatArrays';
import { $filter } from './$filter';
import { $first } from './$first';
import { $firstN } from './$firstN';
import { $in } from './$in';
import { $indexOfArray } from './$indexOfArray';
import { $isArray } from './$isArray';
import { $last } from './$last';
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

export interface ArrayOperators
  extends
    $arrayElemAt,
    $arrayToObject,
    $concatArrays,
    $filter,
    $first,
    $firstN,
    $in,
    $indexOfArray,
    $isArray,
    $last,
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
