import { Chalk } from "chalk";
import * as Badge from "figures";

import { Levels } from "../../constants/levels";

export interface LoggerType {
  badge: (badge: typeof Badge) => string;
  color: (color: Chalk) => Chalk;
  label: string;
  level: Levels;
}

export type Types<T extends string> = {
  [key in T]: LoggerType;
};
