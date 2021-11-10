import { MoneyUnits } from "../../src";

describe("MoneyUnit", () => {
  test.each([
    [MoneyUnits.USD, "USD"],
    [MoneyUnits.THB, "THB"],
  ])("The name of %p is %s", (p, s) => {
    expect(p.name).toEqual(s);
  });

  test("Custom money unit", () => {
    const HKD = MoneyUnits.custom("HKD", 7.75);

    expect(HKD.name).toEqual("HKD");
    expect(HKD.multiple).toEqual(7.75);
  });
});
