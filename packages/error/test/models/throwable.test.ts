import { env } from "@kcutils/helper";
import { Throwable, setProject, ThrowState, ThrowStateType } from "../../src";

describe("Throwable object", () => {
  setProject("error");

  describe("Creation", () => {
    const t = new Throwable(12, "Name", "message...");

    test("getting code", () => {
      expect(t.code).toEqual(12);
    });

    test("getting name", () => {
      expect(t.name).toEqual("Name");
    });

    test("default error name", () => {
      const t2 = new Throwable(12);
      expect(t2.name).toEqual("Error");
    });

    test("default error message", () => {
      const t2 = new Throwable(12);
      expect(t2.message).not.toEqual("");
    });

    test("getting message", () => {
      expect(t.message).toEqual("message...");
    });

    test("equals method checking code and name", () => {
      const t1 = new Throwable(12, "Name");
      const t2 = new Throwable(13, "name");

      expect(t1.equals(t)).toBeTruthy();
      expect(t2.equals(t)).toBeFalsy();
    });

    test("development message is multiple details line", () => {
      const old = env.setEnv("ENV", "development");

      expect(t.toString()).toContain("stacks");

      env.setEnv("ENV", old);
    });

    test("production message is oneline error", () => {
      const old = env.setEnv("ENV", "production");

      expect(t.toString()).not.toContain("stacks");

      env.setEnv("ENV", old);
    });

    test("log throwable exception stack", () => {
      const old = env.setEnv("ENV", "development");

      const t = new Throwable(13, "name");
      const str = t.toString();
      expect(str).toContain("<error>");
      expect(str).toContain("jest");

      env.setEnv("ENV", old);
    });

    test("Throwable.build() works the same as new Throwable()", () => {
      const st = new ThrowState(ThrowStateType.WARN, 12, "TEST");
      const msg = "test";

      const t1 = new Throwable(st.code, st.name, msg, undefined, false);
      const t2 = Throwable.build(st, msg);

      expect(t1.equals(t2)).toEqual(true);
    });

    test("reuse exception message by Throwable.fn()", () => {
      const st = new ThrowState(ThrowStateType.WARN, 99, "UNK");
      const msg = "abc";

      const fn = Throwable.fn(st, msg);

      expect(fn().equals(fn())).toEqual(true);
      expect(fn("null").message).toEqual("abc null");
    });

    test("string template via Throwable.fn()", () => {
      const st = new ThrowState(ThrowStateType.WARN, 99, "UNK");
      const msg = "My %s is broken";

      const fn = Throwable.fn(st, msg);

      expect(fn("pencil").message).toEqual("My pencil is broken");
      expect(fn("abc").equals(fn("def"))).toEqual(true); // same error, different message
    });

    test("Throwable.fn(*, undefined) will return message as default message", () => {
      const st = new ThrowState(ThrowStateType.WARN, 99, "UNK");
      const fn = Throwable.fn(st);

      expect(fn().message).toEqual("something went wrong");
      expect(fn("abc").message).toEqual("something went wrong");
    });

    test("create throwable error with fn and throw by throw keyword", () => {
      const st = new ThrowState(ThrowStateType.ERROR, 2910, "EEE");
      const msg = "unknown error";

      const fn = Throwable.fn(st, msg);

      expect(() => {
        throw fn();
      }).toThrowError();
    });
  });
});
