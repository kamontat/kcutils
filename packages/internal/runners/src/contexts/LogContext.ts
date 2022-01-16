import { inspect, format } from "util";

import { EnvContext } from "./EnvContext";

export class LogContext {
  private _debugMode: boolean;
  private _ciMode: boolean;

  constructor(envContext: EnvContext) {
    this._debugMode = envContext.isDebug(true);
    this._ciMode = envContext.isCI(true);
  }

  private log(key: string, title: string, message?: any) {
    if (!this._debugMode && !this._ciMode) return;

    if (message === undefined || message === null || message === "")
      this.print(format("[%s] %s", key, title));
    else {
      const msg =
        typeof message === "object"
          ? inspect(message, false, 3)
          : format("%s", message);
      this.print(format("[%s] %s", key, title), msg);
    }
  }

  setDebug(toggle: boolean) {
    this._debugMode = toggle;
  }

  setCI(toggle: boolean) {
    this._ciMode = toggle;
  }

  isDebug(): boolean {
    return this._debugMode;
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

  print<T = unknown>(title: string, message?: T): void {
    if (message !== undefined && message !== null) {
      console.log(`${title}: ${message}`);
    } else console.log(title);
  }
}
