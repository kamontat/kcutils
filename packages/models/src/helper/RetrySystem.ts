import { EventEmitter } from "events";

export type RetrySystemEventName = "before-run" | "after-run" | "error" | "retry";
export type RetrySystemEventMapping = {
  error: Error;
  retry: { error: Error; countdown: number };
  "before-run": void;
  "after-run": void;
};

type Callback<T> = () => Promise<T>;
type ParamCallback<P, T> = (p: P) => T;

export class RetrySystem {
  private event: EventEmitter;

  constructor(private delayMs: number) {
    this.event = new EventEmitter();

    if (this.delayMs < 0) this.updateTime(0);
  }

  get delay(): number {
    return this.delayMs;
  }

  /**
   * handle when some event occurred. All possible event listed below
   *
   * 1. `before-run` - execute immediately when call try()
   * 2. `after-run`  - execute if and only if try callback is success
   * 3. `retry`      - execute everytime object has retry to execute callback
   *                 - parameter is object {countdown: number, error: Error}
   * 4. `error`      - execute when try() reject the result and finish retry but still not success
   *                 - parameter is Error
   *
   * @param type event type
   * @param cb callback when event occurred
   */
  on<K extends RetrySystemEventName, T extends RetrySystemEventMapping[K]>(type: K, cb: ParamCallback<T, void>): void {
    this.event.on(type, cb);
  }

  /**
   * apply new delay time to current object
   *
   * @param ms input delay time in millisecond
   */
  updateTime(ms: number): void {
    this.delayMs = ms;

    if (this.delayMs < 0) this.updateTime(0);
  }

  async try<T>(cb: Callback<T>, limit: number = 3): Promise<T> {
    try {
      this.event.emit("before-run");
      const r = await cb();

      this.event.emit("after-run");
      return r;
    } catch (e) {
      if (limit > 1) {
        if (this.delay > 0) {
          await new Promise(res => setTimeout(res, this.delay));
        }

        this.event.emit("retry", { countdown: limit, error: new Error(e) });
        return this.try(cb, limit - 1);
      } else {
        this.event.emit("error", new Error(e));
        return Promise.reject(new Error(e));
      }
    }
  }
}
