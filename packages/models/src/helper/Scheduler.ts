import { EventEmitter } from "events";
import { generic } from "@kcutils/helper";

export type SchedulerEventName = "error" | "before-run" | "after-run" | "stopped" | "starting";
export type SchedulerEventMapping = {
  error: Error;
  "before-run": void;
  "after-run": void;
  stopped: void;
  starting: void;
};

type Callback<T> = () => T;
type ParamCallback<P, T> = (p: P) => T;

export class Scheduler {
  private onDelay?: NodeJS.Timeout | number;
  private onSchedule?: NodeJS.Timeout | number;
  private cb?: Callback<void | Promise<void>>;

  private readonly event: EventEmitter;

  /**
   * @param interval time in millisecond
   * @param delay time in millisecond
   */
  constructor(private interval: number, private delay: number = 0) {
    this.event = new EventEmitter();

    // add handle will process is exit
    process.on("exit", () => {
      this.stop();
    });
  }

  on<K extends SchedulerEventName, T extends SchedulerEventMapping[K]>(type: K, cb: ParamCallback<T, void>): void {
    this.event.on(type, cb);
  }

  schedule(cb: Callback<void | Promise<void>>): void {
    this.event.emit("starting");

    this.cb = cb;
    this.onDelay = setTimeout(() => {
      this.onSchedule = setInterval(async () => {
        try {
          if (!this.isStartable()) throw new Error("cannot start because callback not exist");

          this.event.emit("before-run");
          this.cb && (await this.cb());
          this.event.emit("after-run");
        } catch (e) {
          this.event.emit("error", e);
        }
      }, this.interval);
    }, this.delay);
  }

  updateTime(interval?: number, delay?: number): void {
    if (generic.isNumber(interval)) this.interval = interval;
    if (generic.isNumber(delay)) this.delay = delay;
  }

  /**
   * stop scheduler if it running and start new process
   */
  restart(): void {
    if (!this.cb) throw new Error("cannot get callback, you must call schedule first");

    this.stop();
    this.schedule(this.cb);
  }

  /**
   * return true if start the sehedule include when waiting for delay time
   */
  isStarting(): boolean {
    return generic.isExist(this.onDelay) || this.isRunning();
  }

  /**
   * return true if and only if scheduler start, when delay time will return false
   */
  isRunning(): boolean {
    return generic.isExist(this.onSchedule);
  }

  /**
   * return true if `schedule()` has been called
   */
  isStartable(): boolean {
    return generic.isExist(this.cb);
  }

  /**
   * stop schedule process and delay process
   */
  stop(): void {
    this.onSchedule && clearInterval(this.onSchedule as number);
    this.onDelay && clearTimeout(this.onDelay as number);
    this.event.emit("stopped");
  }

  /**
   * remove all saved data
   */
  clear(): void {
    this.event.removeAllListeners();

    this.onSchedule = undefined;
    this.onDelay = undefined;
    this.cb = undefined;
  }
}
