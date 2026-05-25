declare const CONST_MARKER: unique symbol;

export type Const<T> = T & {
  [CONST_MARKER]: never;
};
