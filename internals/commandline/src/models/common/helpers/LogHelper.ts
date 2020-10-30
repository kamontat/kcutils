import { inspect } from "util";
import { format } from "util";

import { EnvHelper } from "./EnvHelper";

export class LogHelper {
  constructor(private env: EnvHelper) {}

  private log(key: string, title: string, message?: any) {
    if (!this.isDebug() && !this.env.isCI(true)) return;

    if (message === undefined || message === null || message === "") console.log(format("[%s] %s", key, title));
    else {
      const msg = typeof message === "object" ? inspect(message, false, 3) : format("%s", message);
      console.log(format("[%s] %s: %s", key, title, msg));
    }
  }

  isDebug(): boolean {
    return this.env.is("DEBUG", true);
  }

  /**
   * log debug information if $DEBUG env is exist or always in CI
   *
   * @param title title of message or message itself
   * @param message custom message, can be any type. if this is object, wrap with util.inspect()
   */
  debug<T = unknown>(title: string, message?: T): void {
    return this.log("debug", title, message);
  }
}
