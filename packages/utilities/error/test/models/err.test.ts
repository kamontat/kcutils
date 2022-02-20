import { Err } from "../../index";

describe("Err object", () => {
  it("get correct name", () => {
    const e = new Err("Err", "error message");
    expect(e.name).toEqual("Err");
  });
  it("parse template with input data", () => {
    const e = new Err("Err", "template {error}", { error: "hello world" });
    expect(e.message).toEqual("template hello world");
  });
  it("get correct stack information", () => {
    const e = new Err("Err", "hello world", {}, "overrided");
    expect(e.stack).toEqual("overrided");
  });
  it("get error object (without stack)", () => {
    const e = new Err("Err", "hello world", {});
    expect(e.toString()).toEqual("Err: hello world");
  });
  it("get error object template (without stack)", () => {
    const e = new Err("Err", "{a} {b} {c}", { a: "c", b: "a", c: "b" });
    expect(e.toString()).toEqual("Err: c a b");
  });
  it("get error object (with stack)", () => {
    const e = new Err("Err", "{a} {b} {c}", {}, "custom");
    expect(e.toString()).toEqual("Err: {a} {b} {c}");
  });
  it("get error object (with stack)", () => {
    const e = new Err(
      "Err",
      "{a} {b} {c}",
      { a: "c", b: "a", c: "b" },
      "custom"
    );
    expect(e.toString()).toEqual("Err: c a b");
  });
});
