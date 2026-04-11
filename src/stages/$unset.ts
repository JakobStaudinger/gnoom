import { Aggregate } from '../aggregate';

export interface UnsetStage<T extends object> {
  $unset: <const S extends UnsetSpecification<T>>(
    specification: S
  ) => Aggregate<UnsetOutput<T, S>>;
}

export type UnsetSpecification<T extends object> = keyof T | (keyof T)[];

export type UnsetOutput<
  T extends object,
  S extends UnsetSpecification<T>
> = Omit<T, S extends (infer K)[] ? K : S>;
