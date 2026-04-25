import { $dateAdd } from './$dateAdd';
import { $dateDiff } from './$dateDiff';
import { $dateFromParts } from './$dateFromParts';
import { $dateFromString } from './$dateFromString';
import { $dateSubtract } from './$dateSubtract';
import { $dateToParts } from './$dateToParts';
import { $dateToString } from './$dateToString';
import { $dateTrunc } from './$dateTrunc';
import { $year } from './$year';
import { $dayOfYear } from './$dayOfYear';
import { $month } from './$month';
import { $dayOfMonth } from './$dayOfMonth';
import { $week } from './$week';
import { $dayOfWeek } from './$dayOfWeek';
import { $hour } from './$hour';
import { $minute } from './$minute';
import { $second } from './$second';
import { $millisecond } from './$millisecond';
import { $isoWeekYear } from './$isoWeekYear';
import { $isoWeek } from './$isoWeek';
import { $isoDayOfWeek } from './$isoDayOfWeek';

export interface DateOperatorMap
  extends
    $dateAdd,
    $dateDiff,
    $dateFromParts,
    $dateFromString,
    $dateSubtract,
    $dateToParts,
    $dateToString,
    $dateTrunc,
    $year,
    $dayOfYear,
    $month,
    $dayOfMonth,
    $week,
    $dayOfWeek,
    $hour,
    $minute,
    $second,
    $millisecond,
    $isoWeekYear,
    $isoWeek,
    $isoDayOfWeek {}
