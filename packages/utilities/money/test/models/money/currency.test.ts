import { Alea, RandomNumberOption, Xmur3 } from "@kcutils/random";
import { Baht, Money, USDollar } from "../../../index";

const random = new Alea(new Xmur3("Number money"));
const numberLimit: Partial<RandomNumberOption> = {
  min: 5,
  max: 100,
  integer: false,
};
const getNumber = () => {
  return random.number(numberLimit);
};

describe("Currency Number Money", () => {
  test("Predefined zero Baht", () => {
    const z = Baht.zero();

    expect(z.unit).toEqual("THB");
    expect(z.getAmount()).toEqual(0);
  });

  test("Predefined zero USDollor", () => {
    const z = USDollar.zero();

    expect(z.unit).toEqual("USD");
    expect(z.getAmount()).toEqual(0);
  });

  test.each([
    [USDollar, getNumber()],
    [USDollar, getNumber()],
    [USDollar, getNumber()],
    [USDollar, getNumber()],
    [Baht, getNumber()],
    [Baht, getNumber()],
    [Baht, getNumber()],
    [Baht, getNumber()],
  ])("%p(%s) is the same as using NumberMoney()", (t, amount) => {
    const cust = new t(amount);
    const raw = new Money(amount, cust.moneyUnit);

    expect(raw).toEqual(cust);
  });
});
