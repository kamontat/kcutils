import { Context, QuestionContext } from "../../index";

describe("QuestionContext", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let stdin: any = undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let stdout: any = undefined;

  beforeEach(() => {
    stdin = require("mock-stdin").stdin();
    stdout = jest.spyOn(process.stdout, "write").mockImplementation(() => {
      return true;
    });
  });

  test("create package context", () => {
    const context = Context.build().question;
    expect(context).toBeDefined();
  });

  test("asking for string, should return string", () => {
    const output = "hello";
    const context = new QuestionContext();

    const ps = context.askString("test").then((answer) => {
      expect(stdout).toHaveBeenCalledTimes(1);
      expect(answer).toBe(output);
    });

    stdin.send("hello\n");
    stdin.end();
    return ps;
  });

  describe("asking a string", () => {
    test.each([["hello"], [""]])("return input string (%s)", (output) => {
      const context = new QuestionContext();
      const ps = context.askString("test").then((answer) => {
        expect(stdout).toHaveBeenCalledTimes(1);
        expect(answer).toBe(output);
      });

      stdin.send(output + "\n");
      stdin.end();
      return ps;
    });
  });

  describe("asking a number", () => {
    test.each([
      ["hello", -1],
      ["5", 5],
    ])("input (%s) return answer as number type (%s)", (output, result) => {
      const context = new QuestionContext();
      const ps = context.askNumber("test").then((answer) => {
        expect(stdout).toHaveBeenCalledTimes(1);
        expect(answer).toBe(result);
      });

      stdin.send(output + "\n");
      stdin.end();
      return ps;
    });
  });

  describe("asking a boolean", () => {
    test.each([
      ["-1", false],
      ["true", true],
      ["YeS", true],
      ["f", false],
    ])("input (%s) return answer as boolean type (%s)", (output, result) => {
      const context = new QuestionContext();
      const ps = context.askBoolean("test").then((answer) => {
        expect(stdout).toHaveBeenCalledTimes(1);
        expect(answer).toBe(result);
      });

      stdin.send(output + "\n");
      stdin.end();
      return ps;
    });
  });

  afterEach(() => {
    stdin.restore();
    stdout.mockRestore();
  });
});
