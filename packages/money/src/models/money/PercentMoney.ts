import { Money } from "./Money";
import { NumberMoney } from "./NumberMoney";

import { MoneyUnit } from "./MoneyUnit";
import { MoneyType } from "./MoneyType";

export class PercentMoney implements Money {
  static isPercentMoney(m: Money): m is PercentMoney {
    return m.type === MoneyType.Percent;
  }

  static toPercentMoney(m: Money): PercentMoney {
    if (PercentMoney.isPercentMoney(m)) return m;
    else throw new Error(`${m} is not percent money`);
  }

  constructor(protected percent: number) {}

  get type(): MoneyType {
    return MoneyType.Percent;
  }

  plus(money: PercentMoney): PercentMoney {
    const newAmount = this.percent + money.percent;
    return this.copy(newAmount);
  }

  minus(money: PercentMoney): PercentMoney {
    const newAmount = this.percent - money.percent;
    return this.copy(newAmount);
  }

  multiply(num: number): PercentMoney {
    const newAmount = this.percent * num;
    return this.copy(newAmount);
  }

  divide(num: number): PercentMoney {
    const newAmount = this.percent / num;
    return this.copy(newAmount);
  }

  negative(): PercentMoney {
    if (this.percent > 0) return this.multiply(-1);
    else return this.copy();
  }

  positive(): PercentMoney {
    if (this.percent < 0) return this.multiply(-1);
    else return this.copy();
  }

  copy(amount?: number): PercentMoney {
    return new PercentMoney(amount ?? this.percent);
  }

  get unit(): string {
    return "%";
  }

  getAmount(base?: number): number {
    if (base === undefined) return this.percent;
    else return Math.round(base * this.percent) / 100;
  }

  getNumberMoney(base: number, unit: MoneyUnit): NumberMoney {
    return new NumberMoney(this.getAmount(base), unit);
  }

  apply(money: Money): Money {
    return money.copy(this.getAmount(money.getAmount()));
  }

  toString(): string {
    return `${this.percent}${this.unit}`;
  }

  toFixString(digit: number = 3): string {
    return `${this.percent.toFixed(digit)}${this.unit}`;
  }
}
