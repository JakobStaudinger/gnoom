import { $allElementsTrue } from './$allElementsTrue';
import { $anyElementTrue } from './$anyElementTrue';
import { $setDifference } from './$setDifference';
import { $setEquals } from './$setEquals';
import { $setIntersection } from './$setIntersection';
import { $setIsSubset } from './$setIsSubset';
import { $setUnion } from './$setUnion';

export interface SetOperators
  extends
    $allElementsTrue,
    $anyElementTrue,
    $setDifference,
    $setEquals,
    $setIntersection,
    $setIsSubset,
    $setUnion {}
