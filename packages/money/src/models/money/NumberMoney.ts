import { Money } from "./Money";

import { MoneyUnit } from "./MoneyUnit";
import { MoneyType } from "./MoneyType";

export class NumberMoney implements Money {
  static isNumberMoney(m: Money): m is NumberMoney {
    return m.type === MoneyType.Number;
  }

  static toNumberMoney(m: Money): NumberMoney {
    if (NumberMoney.isNumberMoney(m)) return m;
    else throw new Error(`${m} is not number money`);
  }

  constructor(protected amount: number, protected moneyUnit: MoneyUnit) {}

  get type(): MoneyType {
    return MoneyType.Number;
  }

  convert(newUnit: MoneyUnit): NumberMoney {
    const newAmount = (this.amount * newUnit.multiple) / this.moneyUnit.multiple;
    return this.copy(newAmount, newUnit);
  }

  plus(money: NumberMoney): NumberMoney {
    const newMoney = money.convert(this.moneyUnit);
    const newAmount = this.amount + newMoney.amount;
    return this.copy(newAmount);
  }

  minus(money: NumberMoney): NumberMoney {
    const newMoney = money.convert(this.moneyUnit);
    const newAmount = this.amount - newMoney.amount;
    return this.copy(newAmount);
  }

  multiply(num: number): NumberMoney {
    const newAmount = this.amount * num;
    return this.copy(newAmount);
  }

  divide(num: number): NumberMoney {
    const newAmount = this.amount / num;
    return this.copy(newAmount);
  }

  negative(): NumberMoney {
    if (this.amount > 0) return this.multiply(-1);
    else return this.copy();
  }

  positive(): NumberMoney {
    if (this.amount < 0) return this.multiply(-1);
    else return this.copy();
  }

  copy(amount?: number, moneyUnit?: MoneyUnit): NumberMoney {
    return new NumberMoney(amount ?? this.amount, moneyUnit ?? this.moneyUnit);
  }

  get unit(): string {
    return this.moneyUnit.name;
  }

  get unitObject(): MoneyUnit {
    return this.moneyUnit;
  }

  getAmount(): number {
    return this.amount;
  }

  apply(money: Money): Money {
    return money.copy(this.getAmount());
  }

  toString(): string {
    return `${this.amount} ${this.unit}`;
  }

  toFixString(digit: number = 2): string {
    return `${this.amount.toFixed(digit)} ${this.unit}`;
  }
}
