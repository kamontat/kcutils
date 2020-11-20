import { MoneyUnits } from "../../constants";
import { AutoPercent } from "./AutoPercent";
import { MoneyUnit } from "./MoneyUnit";
import { Percentage } from "./Percentage";
import { Type, TypeChecker } from "./Type";

export type MoneyModifier = Money | Percentage;

export type MoneyType = "money";
export class Money implements Type<MoneyType> {
  static is(t: Type<string>): t is Money {
    return TypeChecker.on(t, "money");
  }

  constructor(protected readonly amount: number, readonly moneyUnit: MoneyUnit) {}

  get unit(): string {
    return this.moneyUnit.name;
  }

  get type(): MoneyType {
    return "money";
  }

  convert(newUnit: MoneyUnit): Money {
    return this.copy(this.getAmount(newUnit), newUnit);
  }

  getAmount(newUnit?: MoneyUnit): number {
    if (newUnit) return (this.amount * newUnit.multiple) / this.moneyUnit.multiple;
    else return this.amount;
  }

  apply(auto: AutoPercent): Money {
    return this.plus(auto);
  }

  plus(money: MoneyModifier): Money {
    if (Money.is(money)) {
      const newMoney = money.convert(this.moneyUnit);
      const newAmount = this.amount + newMoney.amount;
      return this.copy(newAmount);
    } else if (Percentage.is(money)) {
      const newAddition = money.calculate(this.amount);
      return this.copy(this.amount + newAddition);
    } else {
      return this.copy();
    }
  }

  minus(money: MoneyModifier): Money {
    if (Money.is(money)) {
      const newMoney = money.convert(this.moneyUnit);
      const newAmount = this.amount - newMoney.amount;
      return this.copy(newAmount);
    } else if (Percentage.is(money)) {
      const newAddition = money.calculate(this.amount);
      return this.copy(this.amount - newAddition);
    } else {
      return this.copy();
    }
  }

  multiply(num: number): Money {
    const newAmount = this.amount * num;
    return this.copy(newAmount);
  }

  divide(num: number): Money {
    const newAmount = this.amount / num;
    return this.copy(newAmount);
  }

  moreThan(m: Money): boolean {
    return this.getAmount() > m.getAmount(this.moneyUnit);
  }

  lessThan(m: Money): boolean {
    return this.getAmount() < m.getAmount(this.moneyUnit);
  }

  equalTo(m: Money): boolean {
    return this.getAmount() < m.getAmount(this.moneyUnit);
  }

  negative(): Money {
    if (this.amount > 0) return this.multiply(-1);
    else return this.copy();
  }

  positive(): Money {
    if (this.amount < 0) return this.multiply(-1);
    else return this.copy();
  }

  copy(amount?: number, unit?: MoneyUnit): Money {
    return new Money(amount ?? this.amount, unit ?? this.moneyUnit);
  }

  toString(): string {
    return `${this.amount} ${this.unit}`;
  }

  toFixString(digit: number = 2): string {
    return `${parseFloat(this.amount.toFixed(digit))} ${this.unit}`;
  }
}
