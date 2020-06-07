import { ThrowState, Throwable, ThrowStateType, Manager, EventType } from "../src";

describe("Error manager", () => {
  it("run normal result manager", () => {
    const hello = (): string => {
      throw Throwable.build(ThrowState(ThrowStateType.WARN, 1, "Hello"), "this is a exception from hello function");
    };

    const world = () => {
      return "hello world";
    };

    const manager = new Manager();

    const helloResult = manager.run(hello);
    const worldResult = manager.run(world);

    expect(helloResult).toBeUndefined();
    expect(worldResult).toBe("hello world");
  });

  it("throw exception when we want", () => {
    const manager = new Manager();
    manager.run(() => {
      throw Throwable.build(ThrowState(ThrowStateType.ERROR, 2, "Exception"), "this is a exception message");
    });

    expect(manager.size).toBe(1);
    manager.on(EventType.NEW_ERROR, t => {
      expect(t).toBeDefined();
    });
  });

  it("get result from future", done => {
    const manager = new Manager();
    manager
      .runFuture(() => {
        return new Promise(res => {
          setTimeout(res, 100);
        });
      })
      .then(done);
  });

  it("get exception from future", done => {
    const manager = new Manager();
    manager.runFuture(() => {
      return new Promise((_, rej) => {
        setTimeout(() => rej(new Error("exception")), 100);
      });
    });

    manager.on(EventType.NEW_ERROR, t => {
      expect(t).toBeDefined();
      done();
    });
  });

  it("get deadly when hase deadly exception", () => {
    const manager = new Manager();
    manager.run(() => {
      throw Throwable.from(new Error("error"), true);
    });

    manager.run(() => {
      throw Throwable.from(new Error("error"), false);
    });

    expect(manager.hasDeadly()).toEqual(true);
  });

  it("get deadly when didn't have deadly exception", () => {
    const manager = new Manager();
    manager.run(() => {
      return "true";
    });

    manager.run(() => {
      throw Throwable.from(new Error("error"), false);
    });

    expect(manager.hasDeadly()).toEqual(false);
  });

  it("reset manager object", () => {
    const manager = new Manager();
    expect(manager.size).toEqual(0);

    manager.run(() => {
      throw Throwable.from(new Error("error"), false);
    });

    expect(manager.size).toEqual(1);

    manager.reset();
    expect(manager.size).toEqual(0);
  });

  it("formatting string when error exist", () => {
    const manager = new Manager();
    manager.run(() => {
      throw Throwable.from(new Error("error"), false);
    });

    expect(manager.formatted()).not.toEqual("");
  });

  it("empty string when error is empty", () => {
    const manager = new Manager();
    expect(manager.formatted()).toEqual("");
  });
});
