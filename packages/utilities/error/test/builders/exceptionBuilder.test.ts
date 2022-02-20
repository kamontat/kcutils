import { ExceptionBuilder, StateTypes } from "../../index";

describe("ExceptionBuilder", () => {
  it("throw without data", () => {
    const e = ExceptionBuilder.fn({
      code: 1,
      name: "test",
      template: "hello world",
      type: StateTypes.WARN,
    });

    expect(() => {
      throw e.throw();
    }).toThrowError("hello world");
  });
  it("throw with data", () => {
    const e = ExceptionBuilder.fn({
      code: 1,
      name: "test",
      template: "{data}.{type}",
      type: StateTypes.WARN,
    });

    expect(() => {
      throw e.throw({ data: "hello world" });
    }).toThrowError("hello world.WARN");
  });
});
