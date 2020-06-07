import { DataTransformFn } from "@internal/commandline";

export type ConfigBuilder<I, O> = {
  default: I;
  transformer: DataTransformFn<I, O>;
};
