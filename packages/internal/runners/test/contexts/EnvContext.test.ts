import { Context, EnvContext } from "../../index";

describe("EnvContext", () => {
  test("create env context", () => {
    const context = Context.build().env;
    expect(context).toBeDefined();
  });

  test("return all false if nothing set", () => {
    const context = new EnvContext({});

    expect(context.isCI()).toBe(false);
    expect(context.isDebug()).toBe(false);
    expect(context.isDev()).toBe(false);
    expect(context.isProd()).toBe(false);
    expect(context.is("test", true)).toBe(false);
    expect(context.is("test", "true")).toBe(false);
  });

  test("return is<name> true if data is properly set", () => {
    const context = new EnvContext({
      ENV: "dev",
      DEBUG: "true",
      CI: "true",
    });

    expect(context.isProd()).toBe(false);
    expect(context.isDev()).toBe(true);
    expect(context.isDebug()).toBe(true);
    expect(context.isCI()).toBe(true);
  });

  test("return data if set via set()", () => {
    const context = new EnvContext({});

    context.set("hello", "world");
    expect(context.is("hello", "world")).toBe(true);
  });

  test("if is(<name>, boolean) with boolean should check existences", () => {
    const context = new EnvContext({
      hello: "world",
    });

    expect(context.is("h", true)).toBe(false);
    expect(context.is("h", false)).toBe(true);

    expect(context.is("hello", true)).toBe(true);
    expect(context.is("hello", false)).toBe(false);
  });

  test("if is(<name>, string) with string should check equivalent", () => {
    const context = new EnvContext({
      hello: "world",
    });

    expect(context.is("h", "")).toBe(true);
    expect(context.is("h", "world")).toBe(false);

    expect(context.is("hello", "")).toBe(false);
    expect(context.is("hello", "world")).toBe(true);
  });

  test("if is(<name>, unknown) always return false", () => {
    const context = new EnvContext({
      hello: "world",
    });

    expect(context.is("hello", 12 as any)).toBe(false);
  });

  test("regex(<name>, <regex>) return false if data not exist", () => {
    const context = new EnvContext({
      hello: "world",
    });

    expect(context.regex("h", /world/)).toBe(false);
  });

  test("regex(<name>, <regex>) return false if data exist but not match regex", () => {
    const context = new EnvContext({
      hello: "world",
    });

    expect(context.regex("hello", /^d$/)).toBe(false);
  });

  test("regex(<name>, <regex>) return true if data exist and match regex", () => {
    const context = new EnvContext({
      hello: "world",
    });

    expect(context.regex("hello", /world/)).toBe(true);
  });
});
