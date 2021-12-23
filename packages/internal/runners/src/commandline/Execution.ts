import { ChildProcess, spawn } from "child_process";
import { Context } from "../contexts";

export type ExecutionData<O> = {
  option?: O;
  commands: string[];
};

export type Execution<T, O> = (context: Context, data: ExecutionData<O>) => T;

export const defaultExecution: Execution<ChildProcess, unknown> = (
  context: Context,
  data: ExecutionData<unknown>
): ChildProcess => {
  const commands = data.commands.copyWithin(0, 0); // copy commands to different list
  const command = context.general.getOrElse(commands.shift(), "echo");

  const proc = spawn(command, commands, { stdio: "inherit" });
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

    // If code is zero, let nodejs handle the exit
    if (code > 0) process.exit(code);
  });

  return proc;
};
