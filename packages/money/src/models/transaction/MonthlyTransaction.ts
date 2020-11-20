import { RecursiveTransaction } from "./RecursiveTransaction";
import { TransactionType } from "./TransactionType";
import { Money } from "../money/Money";
import { TransactionBuilder } from "../../builders/TransactionBuilder";
import { TransactionBuilderOptionMissingError } from "../../constants/errors/transaction";

export class MonthlyTransaction extends RecursiveTransaction {
  static new(name: string): TransactionBuilder<{ day: number }> {
    return TransactionBuilder.new<{ day: number }>((n, m, o) => {
      if (o) return new MonthlyTransaction(n, m, o.day);
      else throw TransactionBuilderOptionMissingError("MonthlyTransaction");
    }).withName(name);
  }

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
