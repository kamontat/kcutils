import { Setting } from "@kcinternal/commandline";
import { ConfigBuilder } from "./ConfigBuilder";

import { byDefault } from "../utils/helper";

export class Config<C, R> extends Setting<Required<C>, R> {
  constructor(builder: ConfigBuilder<C, R>, input?: Partial<C>, dirpath: string = process.cwd()) {
    super({
      dirname: dirpath,
      current: ["@kcinternal", "configuration"],
      input: byDefault({} as C, builder.default, input ?? {}) as Required<C>,
      transform: builder.transformer,
    });
  }
}
