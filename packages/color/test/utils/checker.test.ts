import { NumberType, Type } from "../../src/typings/NumberType";
import { isType, isValidCSSUnit } from "../../src/utils/checker";

describe("checker utilities", () => {
  test.each([
    ["rgb(12, 44, 56)", true],
    ["123, 222, 444", true],
    ["123a", true],
    ["-222", true],
    ["-012", true],
    ["+12", true],
    ["+-123", true],
    ["abc", false],
  ])("validate %s should be %s", (i, o) => {
    expect(isValidCSSUnit(i)).toEqual(o);
  });

  test.each([
    [{ type: "number" } as NumberType, "decimal" as Type, false],
    [{ type: "decimal" } as NumberType, "percent" as Type, false],
    [undefined, "number" as Type, false],
  ])("Is '%p' type same with %s: %s", (a, b, c) => {
    expect(isType(a, b)).toEqual(c);
  });
});
