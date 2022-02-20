import { Exception, StateTypes } from "../../index";

describe("Exception object", () => {
  describe("Normal", () => {
    const state = {
      code: 1,
      name: "Exception",
      type: StateTypes.ERROR,
    };

    it("get correct name", () => {
      const e = new Exception(state, "hello world");
      expect(e.name).toEqual("Exception");
    });
    it("get correct message", () => {
      const e = new Exception(state, "hello world");
      expect(e.message).toEqual("hello world");
    });
    it("get empty stack", () => {
      const e = new Exception(state, "hello world");
      expect(e.stack).toBeUndefined();
    });
  });
  describe("Template", () => {
    const state = {
      code: 1,
      name: "Exception",
      type: StateTypes.ERROR,
    };

    it("get correct name", () => {
      const e = new Exception(state, "code={code}, type={type}");
      expect(e.name).toEqual("Exception");
    });
    it("get correct message", () => {
      const e = new Exception(state, "code={code}, type={type}");
      expect(e.message).toEqual("code=1, type=ERROR");
    });
    it("get correct message with external data", () => {
      const e = new Exception(
        state,
        "code={code}, type={type}, external={external}",
        { external: "data" }
      );
      expect(e.message).toEqual("code=1, type=ERROR, external=data");
    });
    it("get empty stack", () => {
      const e = new Exception(state, "code={code}, type={type}");
      expect(e.stack).toBeUndefined();
    });
  });

  describe("With stack", () => {
    const state = {
      code: 1,
      name: "Exception",
      type: StateTypes.ERROR,
    };

    it("normal", () => {
      const stack = () => "hello";
      const e = new Exception(state, "hello", {}, stack);
      expect(() => {
        throw e;
      }).toThrowError("hello");
    });
  });
});
