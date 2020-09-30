import minimist from "minimist";
import { spawn, ChildProcess } from "child_process";

import { DataChain } from "../models/async/DataChain";
import { Command } from "../models/async/Command";
import { DataProcess } from "../models/common/DataProcess";
import { Helper } from "../models/common/Helper";

export interface CommandlineOption {
  dryrun?: boolean;

  arguments: minimist.ParsedArgs;

  raw: string[];
}

export class Commandline<O extends CommandlineOption, H extends string>
  extends DataChain<O, string[], ChildProcess, H>
  implements Command<ChildProcess> {
  constructor(root: DataProcess<Promise<O>, Promise<string[]>, H>) {
    super(root, async ({ data, helper }) => {
      const options = await Promise.resolve(this.previous.getData());

      const commands = data;
      const command = commands.shift() ?? "echo";

      helper.log.debug("command", `${command} ${commands.join(" ")}`);

      if (!options.dryrun) {
        return this.exec(helper, command, commands);
      } else {
        return this.exec(helper, "exit", ["0"]);
      }
    });
  }

  private exec(helper: Helper<H>, command: string, args: string[]) {
    const proc = spawn(command, args, { stdio: "inherit" });
    proc.on("error", err => {
      if (err) {
        if (err.message.includes("spawn exit ENOENT")) return;
      }

      console.log(err.message);
    });

    proc.on("exit", (_code, signal) => {
      const code = _code ?? -1;

      if (signal) helper.log.debug("exit code", `${code} (signal=${signal})`);
      else helper.log.debug("exit code", code);

      if (code > 0) process.exit(code);
      else process.exit(0);
    });

    return proc;
  }

  start(): Promise<ChildProcess> {
    return this.build();
  }
}
