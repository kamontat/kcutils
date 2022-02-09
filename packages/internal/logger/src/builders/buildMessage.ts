import type { Message, MessageInput } from "../models/Message";
import type { DefaultParameter } from "../models/Parameters";

const buildMessage = <
  M,
  L extends string,
  T extends string,
  TF extends string,
  O extends string
>(
  defaults: DefaultParameter<L, T, TF, O>["defaults"],
  message: MessageInput<M, L, T, TF, O>
): Message<M, L, T, TF, O> => {
  if (typeof message !== "object") {
    return Object.assign({ value: message }, defaults) as Message<
      M,
      L,
      T,
      TF,
      O
    >;
  }
  return Object.assign(
    {
      ...defaults,
    },
    message
  ) as Message<M, L, T, TF, O>;
};

export default buildMessage;
