import { Context } from "../..";

describe("GeneralContext", () => {
  test("create general context", () => {
    const context = Context.build().general;
    expect(context).toBeDefined();
  });

  test("exist() should check same as nullish", () => {
    const context = Context.build().general;

    expect(context.exist("test")).toBe(true);
    expect(context.exist(false)).toBe(true);
    expect(context.exist(0)).toBe(true);

    expect(context.exist("")).toBe(false);
    expect(context.exist(null)).toBe(false);
    expect(context.exist(undefined)).toBe(false);
  });

  test("getOrElse() should check same as nullish + empty string", () => {
    const context = Context.build().general;

    expect(context.getOrElse("b", "a")).toEqual("b");
    expect(context.getOrElse(0, 99)).toEqual(0);
    expect(context.getOrElse(false, true)).toEqual(false);
    expect(context.getOrElse([], ["default"])).toEqual([]);

    expect(context.getOrElse("", "default")).toBe("default");
    expect(context.getOrElse(null, "a")).toBe("a");
    expect(context.getOrElse(undefined, "b")).toBe("b");
  });

  test("getOr() should pick first valid value", () => {
    const context = Context.build().general;
    expect(
      context.getOr("default", undefined, null, "", "valid", "second-valid")
    ).toEqual("valid");

    expect(context.getOr("default", undefined, null, "")).toEqual("default");
  });

  test("byDefault() should merge json with default", () => {
    const context = Context.build().general;

    const base = {
      test: 1,
      second: 2,
      third: 4,
    };

    expect(
      context.byDefault(base, {
        third: 3,
      })
    ).toEqual({
      test: 1,
      second: 2,
      third: 3,
    });

    expect(
      context.byDefault(base, {
        third: undefined,
      })
    ).toEqual({
      test: 1,
      second: 2,
      third: undefined,
    });
  });
});
