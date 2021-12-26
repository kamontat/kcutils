import { Context } from "../..";

describe("QuestionContext", () => {
  test("create package context", () => {
    const context = Context.build().question;
    expect(context).toBeDefined();
  });
});
