import { Throwable, ThrowState, ThrowStateType } from "@kcutils/error";

export const InvalidateColorState = new ThrowState(ThrowStateType.ERROR, 3, "Color error");
export const InvalidateColorError = Throwable.fn(InvalidateColorState, "color(id='%s', raw='%s') is invalid");

export const ColorNotFoundState = InvalidateColorState.next();
export const ColorNotFoundError = Throwable.fn(ColorNotFoundState, "cannot found any color in builder");
