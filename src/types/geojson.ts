export interface GeoPoint {
  type: 'Point';
  coordinates: [longitude: number, latitude: number] | number[];
}

export interface GeoLineString {
  type: 'LineString';
  coordinates: [longitude: number, latitude: number][] | number[][];
}

export interface GeoPolygon {
  type: 'Polygon';
  coordinates: [longitude: number, latitude: number][][] | number[][][];
}

export interface GeoMultiPoint {
  type: 'MultiPoint';
  coordinates: [longitude: number, latitude: number][] | number[][];
}

export interface GeoMultiLineString {
  type: 'MultiLineString';
  coordinates: [longitude: number, latitude: number][][] | number[][][];
}

export interface GeoMultiPolygon {
  type: 'MultiPolygon';
  coordinates: [longitude: number, latitude: number][][][] | number[][][][];
}

export interface GeometryCollection {
  type: 'GeometryCollection';
  geometries: GeoJSON[];
}

export type GeoJSON =
  | GeoPoint
  | GeoLineString
  | GeoPolygon
  | GeoMultiPoint
  | GeoMultiLineString
  | GeoMultiPolygon
  | GeometryCollection;
