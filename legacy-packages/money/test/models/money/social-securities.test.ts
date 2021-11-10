import { SocialSecurity } from "../../../src";

describe("SocialSecurity", () => {
  describe.each([
    [15, 10000, -750],
    [10, 6000, -600],
  ])("new SocialSecurity(%s)", (number, base, expected) => {
    const d = new SocialSecurity(number);

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
