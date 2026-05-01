import { $encStrContains } from './$encStrContains';
import { $encStrEndsWith } from './$encStrEndsWith';
import { $encStrNormalizedEq } from './$encStrNormalizedEq';
import { $encStrStartsWith } from './$encStrStartsWith';

export interface EncryptedStringOperators
  extends
    $encStrContains,
    $encStrEndsWith,
    $encStrNormalizedEq,
    $encStrStartsWith {}
