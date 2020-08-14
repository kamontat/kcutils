import { Setting } from "@kcinternal/commandline";
import { ConfigBuilder } from "./ConfigBuilder";

export class Config<C, R> extends Setting<Required<C>, R> {
  constructor(builder: ConfigBuilder<C, R>, input?: Partial<C>, dirpath: string = process.cwd()) {
    super({
      dirname: dirpath,
      current: ["@kcinternal", "configuration"],
      input: Object.assign(builder.default, input) as Required<C>,
      transform: builder.transformer,
    });
  }
}
