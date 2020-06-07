import { Setting } from "@internal/commandline";
import { ConfigBuilder } from "./ConfigBuilder";

export class Config<C, R> extends Setting<C, R> {
  constructor(builder: ConfigBuilder<C, R>, input?: C, dirpath: string = process.cwd()) {
    super({ dirname: dirpath, input: input ?? builder.default, transform: builder.transformer });
  }
}
