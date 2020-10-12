import { RecursiveTransaction } from "./RecursiveTransaction";
import { TransactionType } from "./TransactionType";
import { Money } from "../money/Money";

export class MonthlyTransaction extends RecursiveTransaction {
  constructor(name: string, money: Money, day: number) {
    super(name, money, day);
  }

  getType(): TransactionType {
    return TransactionType.Expense;
  }

  isPaid(): boolean {
    return false;
  }

  copy(name?: string, newMoney?: Money): MonthlyTransaction {
    return new MonthlyTransaction(name ?? this.name, newMoney ?? this.money, this.date as number);
  }
}
