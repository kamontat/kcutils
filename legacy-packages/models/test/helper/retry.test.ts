import { RetrySystem } from "../../src";

describe("RetrySystem", () => {
  test("create new RetrySystem", () => {
    const r = new RetrySystem(0);
    expect(r).not.toBeUndefined();
  });

  test("get delay time when retry", () => {
    const r = new RetrySystem(5 * 1000);
    expect(r.delay).toEqual(5000);
  });

  test("able to update delay time via updateTime(number)", () => {
    const r = new RetrySystem(5 * 1000);
    expect(r.delay).toEqual(5000);

    r.updateTime(1);

    expect(r.delay).toEqual(1);
  });

  test("delay never below zero", () => {
    const r = new RetrySystem(-123);
    expect(r.delay).toEqual(0);

    r.updateTime(-345);
    expect(r.delay).toEqual(0);
  });

  test("check before-run event", cb => {
    const beforeRun = jest.fn();
    const fn = jest.fn();

    const r = new RetrySystem(0);
    r.on("before-run", beforeRun);

    r.try(fn).then(() => {
      expect(beforeRun).toBeCalledTimes(1);
      cb();
    });
  });

  test("check before-run event", cb => {
    const afterRun = jest.fn();
    const fn = jest.fn();

    const r = new RetrySystem(0);
    r.on("after-run", afterRun);

    r.try(fn).then(() => {
      expect(afterRun).toBeCalledTimes(1);
      cb();
    });
  });

  test("check 'retry' event will not include last error", cb => {
    const error = new Error("error");

    const retryRun = jest.fn();

    const fn = jest.fn(() => {
      throw error;
    });

    const r = new RetrySystem(0);
    r.on("retry", retryRun);

    // default is 3 times
    r.try(fn)
      .catch(e => {
        expect(e).not.toBeUndefined();
      })
      .finally(() => {
        expect(retryRun).toBeCalledTimes(3 - 1);

        r.try(fn, 5)
          .catch(e => {
            expect(e).not.toBeUndefined();
          })
          .finally(() => {
            expect(retryRun).toBeCalledTimes(8 - 2);
            cb();
          });
      });
  });

  test("check 'error' event", cb => {
    const error = new Error("error");

    const afterRun = jest.fn();
    const errorRun = jest.fn();

    const fn = jest.fn(() => {
      throw error;
    });

    const r = new RetrySystem(0);
    r.on("after-run", afterRun);
    r.on("error", errorRun);

    r.try(fn)
      .catch(e => {
        expect(e).not.toBeUndefined();
      })
      .finally(() => {
        expect(afterRun).not.toBeCalled();
        expect(errorRun).toBeCalled();
        cb();
      });
  });

  test("retry with delay time", cb => {
    jest.useFakeTimers();

    const error = new Error("hello, world");
    const fn = jest.fn(() => {
      throw error;
    });
    const r = new RetrySystem(1); // 1 millisecond delay
    const p = r.try(fn, 2);

    jest.advanceTimersByTime(3);

    p.catch(e => {
      expect(e).not.toBeUndefined();
      cb();
    });
  });
});
