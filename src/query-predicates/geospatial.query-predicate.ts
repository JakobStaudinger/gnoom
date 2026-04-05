export type GeospatialQueryPredicate<T> = {
  $geoIntersects?: unknown;
  $geoWithin?: unknown;
  $near?: unknown;
  $nearSphere?: unknown;
};
