import { Throwable, ThrowState, ThrowStateType } from "@kcutils/error";

export const TypeNotFoundState = new ThrowState(ThrowStateType.ERROR, 2, "Type not found");
export const TypeNotFoundError = Throwable.fn(TypeNotFoundState, "input(%s) isn't have 'type' key");
