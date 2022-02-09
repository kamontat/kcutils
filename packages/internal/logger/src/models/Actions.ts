import type { Transformer, TransformerWithContext } from "./Transformer";
import type { SettingParameter, MessageParameter } from "./Parameters";
import type { Context } from "./Context";

export interface ActionParameters<
  L extends string,
  T extends string,
  TF extends string,
  O extends string
> extends SettingParameter<L, T>,
    MessageParameter<unknown, L, T, TF, O> {}

export interface Actions<
  C1 extends Context,
  L extends string,
  T extends string,
  TF extends string,
  O extends string,
  C2 extends Context
> {
  transformers: {
    [key in TF]: TransformerWithContext<
      ActionParameters<L, T, TF, O>,
      string,
      C1 & C2
    >;
  };
  outputs: {
    [key in O]: Transformer<string, void>;
  };
  context?: Transformer<ActionParameters<L, T, TF, O>, C2>;
}
