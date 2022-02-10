export enum Categories {
  Config = "configs",
  Type = "typings",
  Private = "private",
  Internal = "internal",
  Utils = "utilities",
}

export const categoryChoices = [
  Categories.Utils,
  Categories.Internal,
  Categories.Config,
  Categories.Private,
  Categories.Type,
];

export enum Namespaces {
  Config = "kcconfig",
  Type = "types",
  Private = "kcprivate",
  Internal = "kcinternal",
  Utils = "kcutils",
}
