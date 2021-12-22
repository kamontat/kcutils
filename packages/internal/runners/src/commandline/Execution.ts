import { ChildProcess, spawn } from "child_process";
import { Context } from "../contexts";

export type Execution<T> = (
  context: Context,
  command: string,
  args: string[]
) => T;

export const defaultExecution: Execution<ChildProcess> = (
  context: Context,
  command: string,
  args: string[]
): ChildProcess => {
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

    // If code is zero, let nodejs handle the exit
    if (code > 0) process.exit(code);
  });

  return proc;
};
