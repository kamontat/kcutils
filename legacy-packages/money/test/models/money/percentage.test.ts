import { AutoPercent, AutoPercentAction, Percentage, Uplift, Downlift } from "../../../src";
import { PercentIncrease, PercentDecrease } from "../../../src/models/money/AutoPercent";

describe("Percentage", () => {
  test("create new object", () => {
    expect(new Percentage(10)).not.toBeUndefined();
  });

  test("the type should be `percentage`", () => {
    expect(new Percentage(10).type).toEqual("percentage");
  });

  test("toString()", () => {
    const p = new Percentage(10);

    expect(p.toString()).toEqual(`10%`);
  });

  test.each([
    [1.99999, undefined, "2%"],
    [1.9989, undefined, "1.999%"],
    [1.9899, undefined, "1.99%"],
    [1.99999, 1, "2%"],
    [1.9989, 1, "2%"],
    [1.9899, 1, "2%"],
    [1.8999, 1, "1.9%"],
  ])("(%s).toFixString(%s) return '%s'", (n, o, s) => {
    const p = new Percentage(n);

    if (o) expect(p.toFixString(o)).toEqual(s);
    else expect(p.toFixString()).toEqual(s);
  });
});

describe.each([
  [10, "increase" as AutoPercentAction, 10],
  [12, "increase" as AutoPercentAction, 12],
  [-12, "increase" as AutoPercentAction, -12],
  [0, "increase" as AutoPercentAction, 0],
  [10, "decrease" as AutoPercentAction, -10],
  [12, "decrease" as AutoPercentAction, -12],
  [-12, "decrease" as AutoPercentAction, 12],
  [0, "decrease" as AutoPercentAction, 0],
])("AutoPercent(%s, %s)", (number, opt, result) => {
  test("create with AutoPercent object", () => {
    const p = new AutoPercent(number, opt, "test");

    expect(p.percent).toEqual(number);
    expect(p.calculate(100)).toEqual(result);
  });

  if (opt === "increase") {
    test("create with PercentIncrease", () => {
      const p = new PercentIncrease(number);
      expect(p.percent).toEqual(number);
      expect(p.calculate(100)).toEqual(result);
    });

    test("create with Uplift", () => {
      const p = new Uplift(number);
      expect(p.percent).toEqual(number);
      expect(p.calculate()).toEqual(result);
    });
  }
  if (opt === "decrease") {
    test("create with PercentDecrease", () => {
      const p = new PercentDecrease(number);
      expect(p.percent).toEqual(number);
      expect(p.calculate(100)).toEqual(result);
    });

    test("create with Downlift", () => {
      const p = new Downlift(number);
      expect(p.percent).toEqual(number);
      expect(p.calculate()).toEqual(result);
    });
  }
});
