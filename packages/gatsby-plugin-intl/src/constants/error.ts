import { Throwable, ThrowState, ThrowStateType } from "@kcutils/error";

export const InvalidInputState = new ThrowState(ThrowStateType.ERROR, 100, "InvalidInput");
export const InvalidInputError = Throwable.fn(InvalidInputState, `Cannot create %s because %s is invalid`);
