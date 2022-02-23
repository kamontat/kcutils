import { Discount } from "../../../index";

describe("Discount", () => {
  describe.each([
    [-5, 50, 2.5],
    [12, 98, -11.76],
    [0, 9, 0],
    [-0, 9, 0],
    [1.55, 700, -10.85],
  ])("new Discount(%s)", (number, base, expected) => {
    const d = new Discount(number);

    test("create new object", () => {
      expect(d).not.toBeUndefined();
    });

    test("input should set as percent number", () => {
      expect(d.percent).toEqual(number);
    });

    test(`${number}% of ${base} is ${expected}`, () => {
      expect(d.calculate(base)).toBeCloseTo(expected);
    });
  });
});
