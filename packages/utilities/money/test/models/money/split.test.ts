import { Split } from "../../../index";

describe("Split", () => {
  describe.each([
    [undefined, 1200, 0],
    [-1, 1200, 0],
    [-2, 1500, 0],
    [0, 700, 0],
    [1, 550, 0],
    [2, 900, -450],
    [3, 330, -220],
    [4, 164, -123],
  ])("new Split(%s)", (number, base, expected) => {
    const d = number ? new Split(number) : new Split();

    test("create new object", () => {
      expect(d).not.toBeUndefined();
    });

    test(`${number}% of ${base} is ${expected}`, () => {
      expect(d.calculate(base)).toBeCloseTo(expected);
    });
  });
});
