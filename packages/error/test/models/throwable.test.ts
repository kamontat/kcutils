import { Throwable } from "../../src";

describe("Throwable object", () => {
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
      process.env.ENV = "development";
      expect(t.toString()).toContain("stacks");
    });

    test("production message is oneline error", () => {
      process.env.ENV = "production";
      expect(t.toString()).not.toContain("stacks");
    });
  });
});
