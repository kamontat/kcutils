import { Scheduler } from "../../src";

class MS {
  constructor(private readonly time: number) {}

  private multiply(i: number) {
    return this.time * i;
  }

  get millisecond() {
    return this.time;
  }

  get second() {
    return this.multiply(1000);
  }

  get minute() {
    return this.multiply(1000 * 60);
  }

  get hour() {
    return this.multiply(1000 * 60 * 60);
  }

  get day() {
    return this.multiply(1000 * 60 * 60 * 24);
  }
}

const ms = (n: number) => new MS(n);

const zero = ms(0).millisecond;
const emptyFn = jest.fn<void, any>();

let scheduler: Scheduler = new Scheduler(ms(3).millisecond, zero);

beforeEach(() => {
  scheduler = new Scheduler(ms(3).second, zero);
});

afterEach(() => {
  scheduler.stop();
  scheduler.clear();

  jest.clearAllTimers();
});

describe("Scheduler", () => {
  test("All is<xxx> method should returns false by default", () => {
    expect(scheduler.isStartable()).toEqual(false);
    expect(scheduler.isStarting()).toEqual(false);
    expect(scheduler.isRunning()).toEqual(false);
  });

  test("isStart() and isStartable() should return true after start", () => {
    scheduler.schedule(emptyFn);

    expect(scheduler.isStartable()).toEqual(true);
    expect(scheduler.isStarting()).toEqual(true);
    expect(scheduler.isRunning()).toEqual(false);
  });

  test("is Running will return true when schedule is running", cb => {
    scheduler.updateTime(ms(1).millisecond, ms(1).millisecond);
    scheduler.schedule(emptyFn);

    scheduler.on("before-run", () => {
      expect(scheduler.isStartable()).toEqual(true);
      expect(scheduler.isStarting()).toEqual(true);
      expect(scheduler.isRunning()).toEqual(true);
      cb();
    });
  });

  test("cannot restart when never start before", () => {
    const fn = () => {
      scheduler.restart();
    };

    expect(fn).toThrowError();
  });

  test("called schedule callback after-run event", () => {
    scheduler.updateTime(ms(1).millisecond, ms(1).millisecond);
    scheduler.on("before-run", () => {
      expect(emptyFn).not.toBeCalled();
    });

    scheduler.on("after-run", () => {
      expect(emptyFn).toBeCalled();
    });

    scheduler.schedule(emptyFn);
  });

  test("handle exception from callback by on('error')", cb => {
    scheduler.updateTime(ms(1).millisecond, ms(1).millisecond);

    const error = new Error("error");
    scheduler.schedule(() => {
      throw error;
    });

    scheduler.on("error", (e: Error) => {
      expect(e).toEqual(error);
      cb();
    });
  });

  test("restart process", () => {
    jest.useFakeTimers();

    const fn = jest.fn();

    scheduler.updateTime(ms(1).millisecond, zero);
    expect(fn).toBeCalledTimes(0);

    scheduler.schedule(fn);
    jest.advanceTimersByTime(ms(2).millisecond);
    expect(fn).toBeCalledTimes(2);

    scheduler.stop();
    expect(fn).toBeCalledTimes(2);

    scheduler.restart();
    jest.advanceTimersByTime(ms(2).millisecond);
    expect(fn).toBeCalledTimes(4);
  });
});
