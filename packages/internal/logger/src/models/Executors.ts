import type { Actions } from "./Actions";
import type { Context } from "./Context";
import type {
  ContextParameter,
  SettingParameter,
  DefaultParameter,
} from "./Parameters";

export interface ActionExecutors<
  C1 extends Context,
  L extends string,
  T extends string,
  TF extends string,
  O extends string,
  C2 extends Context
> {
  actions: Actions<C1, L, T, TF, O, C2>;
}

export interface Executors<
  C1 extends Context,
  L extends string,
  T extends string,
  TF extends string,
  O extends string,
  C2 extends Context
> extends ContextParameter<C1>,
    SettingParameter<L, T>,
    DefaultParameter<L, T, TF, O>,
    ActionExecutors<C1, L, T, TF, O, C2> {}
