import { inspect, format } from "util";

import { EnvContext } from "./EnvContext";

export class LogContext {
  private _debugMode: boolean;

  constructor(envContext: EnvContext) {
    this._debugMode = envContext.isDebug(true);
  }

  private log(key: string, title: string, message?: unknown) {
    if (this._debugMode) {
      const _title = format("[%s] %s", key, title);
      this.print(_title, message);
    }
  }

  setDebug(toggle: boolean) {
    this._debugMode = toggle;
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
    if (message === undefined || message === null) {
      console.log(title);
      return;
    }

    const _message =
      typeof message === "object"
        ? inspect(message, false, 3)
        : format("%s", message);
    if (_message === "") {
      console.log(title);
      return;
    }

    console.log(`${title}: ${_message}`);
  }
}
