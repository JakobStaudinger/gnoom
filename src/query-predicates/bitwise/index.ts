import { $bitsAllClear } from './$bitsAllClear';
import { $bitsAllSet } from './$bitsAllSet';
import { $bitsAnyClear } from './$bitsAnyClear';
import { $bitsAnySet } from './$bitsAnySet';

export interface BitwiseQueryPredicate
  extends $bitsAllClear, $bitsAllSet, $bitsAnyClear, $bitsAnySet {}
