declare module "generic" {
  export type WithNull<T> = T | null;
  export type WithUndefined<T> = T | undefined;
  export type Null = undefined | null;

  export type Optional<T> = T | undefined | null;
  export type Nullable<T> = Optional<T>; // alias
}
