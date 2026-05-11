import { ObjectId, Timestamp, UUID } from 'mongodb';
import {
  NonCollapsingNumber,
  NonCollapsingString,
  NonCollapsingUnknown
} from './non-collapsing';
import { AnyObject } from './object';

export interface OverloadTransformation {
  output: unknown;
  T: unknown;
}

export type Overload<T, Fn extends OverloadTransformation> =
  | OverloadBoolean<T, Fn>
  | (T extends infer U
      ? U extends boolean
        ? never
        : U extends unknown
          ? ApplyTransformation<Unbundle<U>, Fn>
          : never
      : never);

export type OverloadArray<T> = Overload<T, OverloadArrayTransformation>;
interface OverloadArrayTransformation extends OverloadTransformation {
  output: this['T'][];
}

declare const bundled: unique symbol;
export type BundleOverload<T> = { [bundled]: T };
type Unbundle<T> = T extends { [bundled]: infer _T } ? _T : T;

type BundledPrimitive =
  | BundleOverload<NonCollapsingString>
  | boolean
  | BundleOverload<NonCollapsingNumber>
  | Date
  | Timestamp
  | ObjectId
  | UUID;

export type UnknownOverloaded =
  | UnknownOverloadedHelper
  | Overload<UnknownOverloadedHelper, BundleNullableTransformation>;

interface BundleNullableTransformation extends OverloadTransformation {
  output: BundleOverload<this['T'] | null | undefined>;
}

type UnknownOverloadedHelper =
  | BundledPrimitive
  | AnyObject
  | OverloadArray<BundledPrimitive | AnyObject>
  | NonCollapsingUnknown[];

type OverloadBoolean<T, Fn extends OverloadTransformation> = boolean extends T
  ? ApplyTransformation<boolean, Fn>
  : never;

type ApplyTransformation<T, Fn extends OverloadTransformation> = (Fn & {
  T: T;
})['output'];
