import { RecursiveTransaction } from "./RecursiveTransaction";
import { TransactionType } from "./TransactionType";
import { Money } from "../money";
import { RecursiveUnit } from "../datetime/RecursiveUnit";

export class DailyTransaction extends RecursiveTransaction {
  constructor(name: string, money: Money) {
    super(name, money, RecursiveUnit.Daily);
  }

  getType(): TransactionType {
    return TransactionType.Expense;
  }

  isPaid(): boolean {
    return false;
  }

  copy(name?: string, newMoney?: Money): DailyTransaction {
    return new DailyTransaction(name ?? this.name, newMoney ?? this.money);
  }
}
