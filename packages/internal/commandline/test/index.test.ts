import { Demo, HelloWorld, mergeDemo } from "..";

describe("Demo", () => {
  test("static demo must be hello @kcinternal/commandline", () => {
    expect(HelloWorld.toString()).toEqual("0: hello, @kcinternal/commandline");
  });

  test("correct id and default message in demo object", () => {
    const demo = new Demo(4);
    expect(demo.id).toEqual(4);
    expect(demo.message).toEqual("demo");
  });

  test("correct id and message in demo object", () => {
    const demo = new Demo(12, "extra name");
    expect(demo.id).toEqual(12);
    expect(demo.message).toEqual("extra name");
  });

  test("update demo object", () => {
    const demo = new Demo(12, "extra name");
    expect(demo.toString()).toEqual("12: extra name");

    demo.updateMessage("new name");
    expect(demo.toString()).toEqual("12: new name");
  });

  test("correct next demo id", () => {
    const demo = new Demo(12, "extra name");
    expect(demo.next()).toEqual(13);
  });

  test("correct merge 2 demo", () => {
    const d1 = new Demo(5, "ne");
    const d2 = new Demo(7, "xt");
    expect(mergeDemo(d1, d2).toString()).toEqual("12: next");
  });
});
