export type JsonKey = string;
export type JsonValue = any;

export type PossibleValue<T = JsonValue> = T | T[];
export type PossibleValues<T = PossibleValue<unknown>> = T | Record<JsonKey, T>;

export type Json<T = JsonValue> = Partial<Record<JsonKey, PossibleValue<T>>>;
export type NestedJson<T = JsonValue> = Partial<
  Record<JsonKey, PossibleValues<PossibleValue<T>>>
>;
