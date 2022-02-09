import type { Data } from "./Data";

export interface Settings<L extends string, T extends string> {
  levels: {
    [key in L]: Data<string>;
  };
  types: {
    [key in T]: Data<string>;
  };
}
