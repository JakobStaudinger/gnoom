export interface TrigonometryOperatorMap {
  $sin: (x: number) => number;
  $cos: (x: number) => number;
  $tan: (x: number) => number;
  $asin: (x: number) => number;
  $acos: (x: number) => number;
  $atan: (x: number) => number;
  $atan2: (y: number, x: number) => number;
  $asinh: (x: number) => number;
  $acosh: (x: number) => number;
  $atanh: (x: number) => number;
  $sinh: (x: number) => number;
  $cosh: (x: number) => number;
  $tanh: (x: number) => number;
  $degreesToRadians: (x: number) => number;
  $radiansToDegrees: (x: number) => number;
}
