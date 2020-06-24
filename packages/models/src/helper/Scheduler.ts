import { EventEmitter } from "events";

export type SchedulerEventName = "error" | "before-run" | "after-run";
type Callback<T> = () => T;

export class Scheduler {
  private readonly event: EventEmitter;

  constructor(private readonly interval: number, private readonly delay: number = 0) {
    this.event = new EventEmitter();
  }

  on(type: SchedulerEventName, cb: Callback<void>): void {
    this.event.on(type, cb);
  }

  schedule(cb: Callback<void | Promise<void>>): void {
    setTimeout(() => {
      const schedule = setInterval(async () => {
        try {
          this.event.emit("before-run");
          await cb();
          this.event.emit("after-run");
        } catch (e) {
          this.event.emit("error");
        }
      }, this.interval);

      process.on("exit", () => {
        clearInterval(schedule);
      });
    }, this.delay);
  }
}
