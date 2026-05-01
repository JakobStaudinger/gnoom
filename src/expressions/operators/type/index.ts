import { $convert } from './$convert';
import { $isNumber } from './$isNumber';
import { $toBool } from './$toBool';
import { $toDate } from './$toDate';
import { $toDecimal } from './$toDecimal';
import { $toDouble } from './$toDouble';
import { $toInt } from './$toInt';
import { $toLong } from './$toLong';
import { $toObjectId } from './$toObjectId';
import { $toString } from './$toString';
import { $type } from './$type';
import { $toUUID } from './$toUUID';

export interface TypeOperators
  extends
    $convert,
    $isNumber,
    $toBool,
    $toDate,
    $toDecimal,
    $toDouble,
    $toInt,
    $toLong,
    $toObjectId,
    $toString,
    $type,
    $toUUID {}
