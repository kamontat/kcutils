import { AString } from "..";

describe("default", () => {
  test("hello world", () => {
    const hw = AString.HelloWorld();
    expect(hw.raw).toEqual("hello world");
  });
});
