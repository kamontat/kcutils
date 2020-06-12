import { env } from "@kcutils/helper";
import { Throwable, setProject } from "../../src";

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
  });
});
