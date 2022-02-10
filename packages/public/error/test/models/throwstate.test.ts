import { ThrowState, ThrowStateType } from "../../index";

describe("ThrowState", () => {
  test("create new throw state object", () => {
    const s = new ThrowState();
    expect(s).not.toBeUndefined();
  });

  test("new empty throw state object will random code", () => {
    const s = new ThrowState();
    expect(s.code).toBeGreaterThan(0);
  });

  test("new empty throw state object will error type", () => {
    const s = new ThrowState();
    expect(s.type).toEqual(ThrowStateType.ERROR);
  });

  test("new empty throw state object will return empty name", () => {
    const s = new ThrowState();
    expect(s.name).toEqual("");
  });

  test("custom code with default name", () => {
    const s = new ThrowState(undefined, 12);

    expect(s.code).toEqual(12);
    expect(s.name).toEqual("");
  });

  test("custom name with default code", () => {
    const s = new ThrowState(undefined, undefined, "new name");

    expect(s.code).toBeGreaterThan(10);
    expect(s.name).toEqual("new name");
  });

  test("custom name with default code", () => {
    const s = new ThrowState(ThrowStateType.WARN, 13, "new name");
    const ns = s.copy();

    expect(s.equals(ns)).toEqual(false);
  });

  test("custom name with default code", () => {
    const s = new ThrowState(ThrowStateType.WARN, 13, "new name");
    const ns = s.copy({ type: ThrowStateType.ERROR });

    expect(s.getId()).not.toEqual(ns.getId());
    expect(s.type).not.toEqual(ns.type);
  });

  test("next state code with same name", () => {
    const s = new ThrowState(ThrowStateType.WARN, 13, "new name");
    const ns = s.next();

    expect(s.code).toBeLessThan(ns.code);
  });

  test("next state code with custom name", () => {
    const s = new ThrowState(ThrowStateType.WARN, 20, "old name");
    const ns = s.next("new name");

    expect(s.code).toBeLessThan(ns.code);
    expect(s.name).not.toEqual(ns.name);
  });
});
