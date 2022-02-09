import type { Settings } from "./Settings";
import type { Message } from "./Message";
import type { Context } from "./Context";

export interface ContextParameter<C1 extends Context> {
  context: C1;
}

export interface SettingParameter<L extends string, T extends string> {
  settings: Settings<L, T>;
}

export interface MessageParameter<
  M,
  L extends string,
  T extends string,
  TF extends string,
  O extends string
> {
  message: Message<M, L, T, TF, O>;
}

export interface DefaultParameter<
  L extends string,
  T extends string,
  TF extends string,
  O extends string
> {
  defaults: Omit<
    Message<
      unknown,
      L,
      T,
      TF extends infer U ? U : never,
      O extends infer U ? U : never
    >,
    "value"
  > &
    Partial<
      Message<
        unknown,
        L,
        T,
        TF extends infer U ? U : never,
        O extends infer U ? U : never
      >
    >;
}
