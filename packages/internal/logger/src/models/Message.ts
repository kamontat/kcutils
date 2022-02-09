export interface Message<
  M,
  L extends string,
  T extends string,
  TF extends string,
  O extends string
> {
  level: L;
  type: T;
  value: M;
  transform: TF;
  output: O;
}

export type MessageInput<
  M,
  L extends string,
  T extends string,
  TF extends string,
  O extends string
> =
  | M
  | (Pick<Message<M, L, T, TF, O>, "value"> & Partial<Message<M, L, T, TF, O>>);
