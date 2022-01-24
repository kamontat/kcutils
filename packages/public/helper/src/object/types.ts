export type PossibleValue<T> = T | T[];
export type PossibleValues<T = PossibleValue<unknown>> = T | Record<string, T>;

export type Json<T> = Partial<Record<string, PossibleValue<T>>>;
export type NestedJson<T> = Partial<
  Record<string, PossibleValues<PossibleValue<T>>>
>;
