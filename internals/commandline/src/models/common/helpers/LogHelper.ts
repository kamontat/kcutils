import { inspect } from "util";
import { format } from "util";

export class LogHelper {
  private log(key: string, title: string, message?: any) {
    if (message === undefined || message === null || message === "") console.log(format("[%s] %s", key, title));
    else {
      const msg = typeof message === "object" ? inspect(message, false, 3) : format("%s", message);

      console.log(format("[%s] %s: %s", key, title, msg));
    }
  }

  debug(title: string, message?: any) {
    return this.log("debug", title, message);
  }
}
