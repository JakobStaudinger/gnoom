import { $allElementsTrue } from './$allElementsTrue';
import { $anyElementTrue } from './$anyElementTrue';
import { $setDifference } from './$setDifference';
import { $setEquals } from './$setEquals';
import { $setIntersection } from './$setIntersection';
import { $setIsSubset } from './$setIsSubset';
import { $setUnion } from './$setUnion';

export interface SetOperatorMap
  extends
    $allElementsTrue,
    $anyElementTrue,
    $setDifference,
    $setEquals,
    $setIntersection,
    $setIsSubset,
    $setUnion {}
