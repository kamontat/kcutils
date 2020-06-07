import { DataTransformFn } from "@kcinternal/commandline";

export type ConfigBuilder<I, O> = {
  default: I;
  transformer: DataTransformFn<I, O>;
};
