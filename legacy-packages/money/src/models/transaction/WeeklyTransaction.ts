import { RecursiveTransaction } from "./RecursiveTransaction";
import { TransactionType } from "./TransactionType";
import { Money } from "../money/Money";
import { WeekdayUnit } from "../datetime/WeekdayUnit";
import { RecursiveUnit } from "../datetime/RecursiveUnit";

export class WeeklyTransaction extends RecursiveTransaction {
  constructor(name: string, money: Money, private readonly weekDay: WeekdayUnit) {
    super(name, money, weekDay, RecursiveUnit.Weekly);
  }

  getType(): TransactionType {
    return TransactionType.Expense;
  }

  isPaid(): boolean {
    return false;
  }

  copy(name?: string, newMoney?: Money): WeeklyTransaction {
    return new WeeklyTransaction(name ?? this.name, newMoney ?? this.money, this.weekDay);
  }
}
