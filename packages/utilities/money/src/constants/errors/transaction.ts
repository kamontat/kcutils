import { Throwable, ThrowState, ThrowStateType } from "@kcutils/error";

export const TransactionBuilderOptionMissingState = new ThrowState(
  ThrowStateType.ERROR,
  200,
  "TransactionBuilderOptionMissing"
);
export const TransactionBuilderOptionMissingError = Throwable.fn(
  TransactionBuilderOptionMissingState,
  "'%s' is require option for operation"
);
