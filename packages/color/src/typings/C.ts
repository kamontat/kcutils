export type C<K extends string, T = number> = {
  [key in K]: T;
};
