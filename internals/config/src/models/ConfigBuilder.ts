import { DataTransformFn, DataBuilderHelperString } from "@kcinternal/commandline";

export type ConfigBuilder<I, O> = {
  default: I;
  transformer: DataTransformFn<I, O, DataBuilderHelperString>;
};
