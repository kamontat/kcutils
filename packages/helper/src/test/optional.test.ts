import { data } from "..";

describe("Optional data", () => {
  test("create new Optional data", () => {
    const opt = new data.Optional("data");
    expect(opt).not.toBeUndefined();
  });

  test("create valid data in Optional", () => {
    const opt = new data.Optional("data");

    expect(opt.isNotEmpty()).toEqual(true);

    expect(opt.get()).toEqual("data");

    expect(opt.getOrElse("new")).toEqual("data");

    expect(opt.orUndefined()).toEqual("data");
  });

  test.each([
    [undefined, false],
    [null, false],
  ])("create invalid data in Optional (%s)", (input, expected) => {
    const opt = new data.Optional<string>(input);

    expect(opt.isNotEmpty()).toEqual(expected);

    expect(opt.getOrElse("new")).toEqual("new");

    expect(opt.orUndefined()).toBeUndefined();
  });

  test("custom checking method", () => {
    const opt = new data.Optional("", d => d !== "");
    expect(opt.isEmpty()).toEqual(true);
  });

  test("get with throw exception", () => {
    const opt = new data.Optional("", d => d !== "");
    const fn = () => {
      opt.get();
    };
    expect(fn).toThrow();
  });
});
