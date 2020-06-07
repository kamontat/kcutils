import { spawn, ChildProcess } from "child_process";

import { DataChain } from "../models/async/DataChain";
import { Command } from "../models/async/Command";
import { DataProcess } from "../models/common/DataProcess";

export class Commandline<O> extends DataChain<O, string[], ChildProcess> implements Command<ChildProcess> {
  constructor(data: DataProcess<O, Promise<string[]>>) {
    super(data, async ({ data }) => {
      const commands = data;
      const command = commands.shift() ?? "echo";

      console.debug(`[debug] command: ${command} ${commands.join(" ")}`);
      const proc = spawn(command, commands, { stdio: "inherit" });
      proc.on("exit", (code, signal) => {
        console.debug(`[debug] exit code: ${code} (signal=${signal})`);

        const c = code ?? 1;
        if (c > 0) process.exit(c);
      });

      return proc;
    });
  }

  start() {
    return this.build();
  }
}
