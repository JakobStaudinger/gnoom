import { $concat } from './$concat';
import { $indexOfBytes } from './$indexOfBytes';
import { $indexOfCP } from './$indexOfCP';
import { $ltrim } from './$ltrim';
import { $regexFind } from './$regexFind';
import { $regexFindAll } from './$regexFindAll';
import { $regexMatch } from './$regexMatch';
import { $replaceOne } from './$replaceOne';
import { $replaceAll } from './$replaceAll';
import { $rtrim } from './$rtrim';
import { $split } from './$split';
import { $strLenBytes } from './$strLenBytes';
import { $strLenCP } from './$strLenCP';
import { $strcasecmp } from './$strcasecmp';
import { $substr } from './$substr';
import { $substrBytes } from './$substrBytes';
import { $substrCP } from './$substrCP';
import { $toLower } from './$toLower';
import { $trim } from './$trim';
import { $toUpper } from './$toUpper';

export interface StringOperatorMap
  extends
    $concat,
    $indexOfBytes,
    $indexOfCP,
    $ltrim,
    $regexFind,
    $regexFindAll,
    $regexMatch,
    $replaceOne,
    $replaceAll,
    $rtrim,
    $split,
    $strLenBytes,
    $strLenCP,
    $strcasecmp,
    $substr,
    $substrBytes,
    $substrCP,
    $toLower,
    $trim,
    $toUpper {}
