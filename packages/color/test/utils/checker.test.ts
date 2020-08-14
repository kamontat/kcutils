import { isValidCSSUnit } from "../../src/utils/checker";

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
});
