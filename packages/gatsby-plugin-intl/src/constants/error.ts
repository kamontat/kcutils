import { Throwable, ThrowState, ThrowStateType } from "@kcutils/error";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InvalidInputState = new ThrowState(ThrowStateType.ERROR, 100, "InvalidInput");
// eslint-disable-next-line @typescript-eslint/naming-convention
export const InvalidInputError = Throwable.fn(InvalidInputState, `Cannot create %s because %s is invalid`);
