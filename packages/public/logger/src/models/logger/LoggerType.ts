import { Levels } from "../../constants/levels";

export type BadgeFn = () => string;
export type ColorFn = (msg: string) => string;

export interface LoggerType {
  badge: BadgeFn;
  color: ColorFn;
  label: string;
  level: Levels;
}

export type Types<T extends string> = {
  [key in T]: LoggerType;
};
