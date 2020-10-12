import { RecursiveTransaction } from "./RecursiveTransaction";
import { TransactionType } from "./TransactionType";
import { Money } from "../money/Money";

export class YearlyTransaction extends RecursiveTransaction {
  constructor(name: string, money: Money, day: number, month: number) {
    super(name, money, day, undefined, month);
  }

  getType(): TransactionType {
    return TransactionType.Expense;
  }

  isPaid(): boolean {
    return false;
  }

  copy(name?: string, newMoney?: Money): YearlyTransaction {
    return new YearlyTransaction(name ?? this.name, newMoney ?? this.money, this.date as number, this.month as number);
  }
}
