import { $geoIntersects } from './$geoIntersects';
import { $geoWithin } from './$geoWithin';
import { $near } from './$near';
import { $nearSphere } from './$nearSphere';

export interface GeospatialQueryPredicate
  extends $geoIntersects, $geoWithin, $near, $nearSphere {}
