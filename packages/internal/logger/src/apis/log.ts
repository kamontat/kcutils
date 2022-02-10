import type { MessageInput } from "../models/Message";
import type { ActionParameters } from "../models/Actions";
import type { Executors } from "../models/Executors";
import type { Context } from "../models/Context";

import buildMessage from "../builders/buildMessage";
import buildContext from "../builders/buildContext";

const log = <
  C1 extends Context,
  M,
  L extends string,
  T extends string,
  TF extends string,
  O extends string,
  C2 extends Context
>(
  executor: Executors<C1, L, T, TF, O, C2>,
  message: MessageInput<M, L, T, TF, O>
) => {
  const data: ActionParameters<L, T, TF, O> = {
    settings: executor.settings,
    message: buildMessage(executor.defaults, message),
  };

  const context = buildContext(
    executor.context,
    data,
    executor.actions.context
  );

  executor.actions.outputs[data.message.output](
    executor.actions.transformers[data.message.transform](data, context)
  );
};

export default log;