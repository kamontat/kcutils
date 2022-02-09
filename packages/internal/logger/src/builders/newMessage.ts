import type { Settings } from "../models/Settings";
import type { Message } from "../models/Message";

const newMessage = <
  L extends string,
  T extends string,
  TF extends string,
  O extends string,
  M
>(
  _setting: Settings<L, T>,
  message: Message<M, L, T, TF, O>
): Message<M, L, T, TF, O> => {
  return message;
};

export default newMessage;
