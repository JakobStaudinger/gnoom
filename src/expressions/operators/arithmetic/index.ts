import { $abs } from './$abs';
import { $add } from './$add';
import { $ceil } from './$ceil';
import { $divide } from './$divide';
import { $exp } from './$exp';
import { $floor } from './$floor';
import { $ln } from './$ln';
import { $log } from './$log';
import { $log10 } from './$log10';
import { $mod } from './$mod';
import { $multiply } from './$multiply';
import { $pow } from './$pow';
import { $round } from './$round';
import { $sigmoid } from './$sigmoid';
import { $sqrt } from './$sqrt';
import { $subtract } from './$subtract';
import { $trunc } from './$trunc';

export interface ArithmeticOperatorMap
  extends
    $abs,
    $add,
    $ceil,
    $divide,
    $exp,
    $floor,
    $ln,
    $log,
    $log10,
    $mod,
    $multiply,
    $pow,
    $round,
    $sigmoid,
    $sqrt,
    $subtract,
    $trunc {}
