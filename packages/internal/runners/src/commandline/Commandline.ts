import { ChildProcess, spawn } from "child_process";
import { Context } from "../contexts";

import { Chain } from "../models/Chain";
import { Starter } from "../models/Starter";
import { Transformer } from "../models/Transformer";
import { OptionData } from "./Option";

export class Commandline<O extends OptionData> implements Starter<string[]> {
  static build<O extends OptionData>(
    action: Transformer<O, string[], string[]>
  ): Commandline<O> {
    if (!action.previous) {
      throw new Error("cannot found option parser");
    }

    return new Commandline(action.previous!, action);
  }

  private constructor(
    private _option: Transformer<string[], O>,
    private _action: Transformer<O, string[]>
  ) {}

  start(input: string[]): Promise<ChildProcess> {
    return Chain.with(this._option)
      .with(this._action)
      .with({
        name: "commandline",
        transform: async (commands, context) => {
          const options = context.history.getOutput<O>("option");
          const command = context.general.getOrElse(commands.shift(), "echo");
          if (options?.debug) {
            context.log.setDebug(true);
          }

          context.log.debug("command", `${command} ${commands.join(" ")}`);

          if (options?.dryrun) {
            return this.exec(context, "exit", ["0"]);
          } else {
            return this.exec(context, command, commands);
          }
        },
      })
      .start(input);
  }

  private exec(context: Context, command: string, args: string[]) {
    const proc = spawn(command, args, { stdio: "inherit" });
    proc.on("error", (err) => {
      if (err) {
        if (err.message.includes("spawn exit ENOENT")) return;
      }

      console.log(err.message);
    });

    proc.on("exit", (_code, signal) => {
      const code = _code ?? -1;

      if (signal) context.log.debug("exit code", `${code} (signal=${signal})`);
      else context.log.debug("exit code", code);

      if (code > 0) process.exit(code);
      else process.exit(0);
    });

    return proc;
  }
}
