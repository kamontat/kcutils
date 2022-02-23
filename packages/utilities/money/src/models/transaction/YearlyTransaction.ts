import { RecursiveTransaction } from "./RecursiveTransaction";
import { TransactionType } from "./TransactionType";
import { Money } from "../money";
import { TransactionBuilder } from "../../builders/TransactionBuilder";
import { TransactionBuilderOptionMissingError } from "../../constants/errors/transaction";

export class YearlyTransaction extends RecursiveTransaction {
  static new(name: string): TransactionBuilder<{ day: number; month: number }> {
    return TransactionBuilder.new<{ day: number; month: number }>((n, m, o) => {
      if (o) return new YearlyTransaction(n, m, o.day, o.month);
      else throw TransactionBuilderOptionMissingError("MonthlyTransaction");
    }).withName(name);
  }

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
