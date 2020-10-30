import {
  Baht,
  MoneyUnits,
  NumberMoney,
  PercentMoney,
  ProvidentFund,
  SocialSecurity,
  Split,
  Tax,
  USDollar,
} from "../../../src";

describe("Percent Money", () => {
  test.each([
    [new SocialSecurity(12), true],
    [new ProvidentFund(12), true],
    [new PercentMoney(12), true],
    [new Tax(7.5), true],
    [new Split(4), true],
    [new NumberMoney(12, MoneyUnits.custom("ABC", 1000)), false],
    [new Baht(12), false],
    [new USDollar(12), false],
  ])("Checking is %p is Percent money: %s", (money, bool) => {
    expect(PercentMoney.isPercentMoney(money)).toEqual(bool);
  });
});
