import { MoneyType } from "./MoneyType";

export interface Money {
  readonly unit: string;
  readonly type: MoneyType;

  getAmount(base?: number): number;

  apply(money: Money): Money;

  plus(money: Money): Money;

  minus(money: Money): Money;

  multiply(amount: number): Money;

  divide(amount: number): Money;

  negative(): Money;

  positive(): Money;

  copy(): Money;

  copy(amount: number): Money;

  toString(): string;

  toFixString(digit: number): string;
}
