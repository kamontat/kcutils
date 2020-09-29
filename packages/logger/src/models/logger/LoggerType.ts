import { Chalk } from "chalk";
import * as Badge from "figures";

import { Levels } from "../../constants/levels";

export type BadgeFn = (badge: typeof Badge) => string;
export type ColorFn = (color: Chalk) => Chalk;

export interface LoggerType {
  badge: BadgeFn;
  color: ColorFn;
  label: string;
  level: Levels;
}

export type Types<T extends string> = {
  [key in T]: LoggerType;
};
