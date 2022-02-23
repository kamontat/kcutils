import {
  MoneyUnits,
  Money,
  Baht,
  USDollar,
  Uplift,
  Percentage,
  AutoPercent,
  ProvidentFund,
  Tax,
  Discount,
  PercentUplift,
  SocialSecurity,
  Split,
} from "../../../index";
import { Type } from "../../../src/models/money/Type";

describe("Money", () => {
  describe("Static method", () => {
    test.each([
      [new Money(10, MoneyUnits.USD), true],
      [new USDollar(9.99), true],
      [new Baht(1999), true],
      [new Uplift(10), false],
    ])("Is %s is money type: %s", (t: Type<string>, o) => {
      expect(Money.is(t)).toEqual(o);
    });
  });

  test("get unit of money as string", () => {
    const p = new Money(10, MoneyUnits.USD);
    expect(p.unit).toEqual("USD");
  });

  test("get unit of money as object", () => {
    const unit = MoneyUnits.custom("ABC", 2);
    const p = new Money(10, unit);
    expect(p.moneyUnit).toEqual(unit);
  });

  test("return string of amount and money unit", () => {
    const p = new Money(1, MoneyUnits.custom("DDD", 100));
    expect(p.toString()).toEqual("1 DDD");
  });

  test("toFixString() with default paramater", () => {
    const p = new Money(1.98999, MoneyUnits.USD);
    expect(p.toFixString()).toEqual("1.99 USD");
  });

  test("toFixString(1) return non digit number", () => {
    const p = new Money(1.98999, MoneyUnits.USD);
    expect(p.toFixString(1)).toEqual("2 USD");
  });

  describe.each([
    [new Baht(50), MoneyUnits.USD, 1.5625],
    [new USDollar(1.5), MoneyUnits.THB, 32 + 16],
    [new Baht(199), MoneyUnits.THB, 199],
    [new Money(199, MoneyUnits.custom("ABC", 2)), MoneyUnits.USD, 99.5],
    [new Money(199, MoneyUnits.custom("ABC", 2)), MoneyUnits.THB, 3184],
    [
      new Money(563, MoneyUnits.custom("NTHB", 31.15)),
      MoneyUnits.custom("HKG", 7.75),
      140.072,
    ],
    [
      new Money(108, MoneyUnits.custom("HKG", 7.75)),
      MoneyUnits.custom("NTHB", 31.15),
      434.09,
    ],
  ])("Convert '%s' currency to %s", (base, unit, result) => {
    test(`return Money(${result}) when using convert()`, () => {
      expect(base.convert(unit).getAmount()).toBeCloseTo(result);
    });

    test(`return Money(${result}) when using getAmount(${unit})`, () => {
      expect(base.getAmount(unit)).toBeCloseTo(result);
    });
  });

  describe.each([
    [-12, 5, -7],
    [12, -5, 7],
    [12, 5, 17],
    [-55, -44, -99],
  ])("Money(%s).plus(Money(%s))", (a, b, c) => {
    test(`should return p1 + p2 ${c}`, () => {
      const p1 = new Baht(a);
      const p2 = new Baht(b);

      expect(p1.plus(p2).getAmount()).toEqual(c);
    });

    test("should return new object", () => {
      const p1 = new Baht(a);
      const p2 = new Baht(b);
      const pp = p1.plus(p2);

      expect(pp).not.toEqual(p1);
      expect(pp).not.toEqual(p2);
    });
  });

  describe.each([
    [100, 5, 105],
    [-100, 5, -105],
    [100, -5, 95],
    [-100, -5, -95],
  ])("Money(%s).plus(Percentage(%s))", (a, b, c) => {
    test(`should correct result: ${c}`, () => {
      const p1 = new Baht(a);
      const p2 = new Percentage(b);

      expect(p1.plus(p2).getAmount()).toEqual(c);
    });

    test(`using .apply() for auto apply`, () => {
      const p1 = new Baht(a);
      const p2 = new AutoPercent(b, "increase", "test");

      expect(p1.apply(p2).getAmount()).toEqual(c);
    });

    test("should return new object", () => {
      const p1 = new Baht(a);
      const p2 = new Percentage(b);
      const pp = p1.plus(p2);

      expect(pp).not.toEqual(p1);
      expect(pp).not.toEqual(p2);
    });
  });

  describe("Money().plus(undefined)", () => {
    test("return copy of current money", () => {
      const p1 = new Baht(0);
      const p2 = p1.plus({ type: "undefined" } as any);

      expect(p1).toEqual(p2);
    });
  });

  describe.each([
    [-12, 5, -17],
    [12, -5, 17],
    [12, 5, 7],
    [-55, -44, -11],
  ])("Money(%s).minus(Money(%s))", (a, b, c) => {
    test(`should return p1 - p2 ${c}`, () => {
      const p1 = new Baht(a);
      const p2 = new Baht(b);

      expect(p1.minus(p2).getAmount()).toEqual(c);
    });

    test("should return new object", () => {
      const p1 = new Baht(a);
      const p2 = new Baht(b);
      const pp = p1.minus(p2);

      expect(pp).not.toEqual(p1);
      expect(pp).not.toEqual(p2);
    });
  });

  describe.each([
    [100, 5, 95],
    [-100, 5, -95],
    [100, -5, 105],
    [-100, -5, -105],
  ])("Money(%s).minus(Percentage(%s))", (a, b, c) => {
    test(`should correct result: ${c}`, () => {
      const p1 = new Baht(a);
      const p2 = new Percentage(b);

      expect(p1.minus(p2).getAmount()).toEqual(c);
    });

    test("should return new object", () => {
      const p1 = new Baht(a);
      const p2 = new Percentage(b);
      const pp = p1.minus(p2);

      expect(pp).not.toEqual(p1);
      expect(pp).not.toEqual(p2);
    });
  });

  describe("Money().minus(undefined)", () => {
    test("return copy of current money", () => {
      const p1 = new Baht(0);
      const p2 = p1.minus({ type: "undefined" } as any);

      expect(p1).toEqual(p2);
    });
  });

  describe("Money.multiply()", () => {
    test.each([
      [4, 5, 20],
      [2, -5, -10],
      [-5, -2, 10],
      [-4, 6, -24],
      [0, 0, 0],
      [10, 0, 0],
      [0, 20, 0],
    ])("p1(%s).multiply(%s) will return p1 * num = %s", (m, num, result) => {
      const p1 = new USDollar(m);
      expect(p1.multiply(num).getAmount()).toEqual(result);
    });

    test("return new object", () => {
      const p1 = new USDollar(12);
      const pp = p1.multiply(555);

      expect(pp).not.toEqual(p1);
    });
  });

  describe("Money.divide()", () => {
    test.each([
      [20, 4, 5],
      [-10, 5, -2],
      [-55, -5, 11],
      [50, -10, -5],
      [0, 20, 0],
    ])("p1(%s).divide(%s) will return p1 / num = %s", (m, num, result) => {
      const p1 = new USDollar(m);
      expect(p1.divide(num).getAmount()).toEqual(result);
    });

    test("divide by zero will throw exception", () => {
      const p1 = new USDollar(12);
      expect(() => {
        expect(p1.divide(0)).toBeUndefined();
      }).toThrow();
    });

    test("return new object", () => {
      const p1 = new USDollar(12);
      const pp = p1.divide(555);

      expect(pp).not.toEqual(p1);
    });
  });

  describe("Money.negative()", () => {
    test.each([
      [10, -10],
      [-50, -50],
      [0, 0],
    ])("negative of money(%s) is '%s'", (i, o) => {
      const p1 = new Money(i, MoneyUnits.custom("ABC", 75));
      const p2 = p1.negative();

      expect(p2.getAmount()).toEqual(o);
    });
  });

  describe("Money.positive()", () => {
    test.each([
      [10, 10],
      [-50, 50],
      [0, 0],
    ])("positive of money(%s) is '%s'", (i, o) => {
      const p1 = new Money(i, MoneyUnits.custom("NET", 75));
      const p2 = p1.positive();

      expect(p2.getAmount()).toEqual(o);
    });
  });

  describe("Money stack", () => {
    const base = new Baht(1_000_000);

    test("with 'ProvidentFund'", () => {
      expect(base.apply(new ProvidentFund(5))).toEqual(new Baht(950_000));
    });

    test("with 'ProvidentFund' and 'Tax'", () => {
      expect(base.apply(new ProvidentFund(5)).apply(new Tax(7))).toEqual(
        new Baht(883_500)
      );
    });

    test("with 'Discount' and 'SocialSecurity' and 'PercentUplift'", () => {
      expect(
        base
          .apply(new Discount(3))
          .apply(new SocialSecurity(55))
          .apply(new PercentUplift(3))
      ).toEqual(new Baht(998327.5));
    });

    test("with 'Split' and 'Discount' and 'Uplift'", () => {
      expect(
        base.apply(new Split(4)).apply(new Discount(4)).apply(new Uplift(100))
      ).toEqual(new Baht(240100));
    });
  });
});
