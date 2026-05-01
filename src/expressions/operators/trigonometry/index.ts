import { $sin } from './$sin';
import { $cos } from './$cos';
import { $tan } from './$tan';
import { $asin } from './$asin';
import { $acos } from './$acos';
import { $atan } from './$atan';
import { $atan2 } from './$atan2';
import { $asinh } from './$asinh';
import { $acosh } from './$acosh';
import { $atanh } from './$atanh';
import { $sinh } from './$sinh';
import { $cosh } from './$cosh';
import { $tanh } from './$tanh';
import { $degreesToRadians } from './$degreesToRadians';
import { $radiansToDegrees } from './$radiansToDegrees';

export interface TrigonometryOperators
  extends
    $sin,
    $cos,
    $tan,
    $asin,
    $acos,
    $atan,
    $atan2,
    $asinh,
    $acosh,
    $atanh,
    $sinh,
    $cosh,
    $tanh,
    $degreesToRadians,
    $radiansToDegrees {}
