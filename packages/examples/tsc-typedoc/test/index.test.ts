import { Example } from "..";

describe("default", () => {
  test("hello world", () => {
    const hw = Example.HelloWorld();
    expect(hw.customName).toEqual("hello world");
  });
});
