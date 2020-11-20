import { Transaction } from "./Transaction";
import { TransactionType } from "./TransactionType";
import { Money } from "../money/Money";
import { Datetime } from "../datetime/Datetime";

export class OneTimeTransaction extends Transaction {
  private alreadyPaid: boolean;

  constructor(
    name: string,
    money: Money,
    private readonly date: number,
    private readonly month: number,
    private readonly year: number
  ) {
    super(name, money);
    this.alreadyPaid = false;
    this.listen("pay", () => (this.alreadyPaid = true));
  }

  isEligible(_start: Datetime, current: Datetime): boolean {
    return (
      current.currentDate() === this.date &&
      current.currentMonth() === this.month &&
      current.currentYear() === this.year
    );
  }

  getType(): TransactionType {
    return TransactionType.Expense;
  }

  isPaid(): boolean {
    return this.alreadyPaid;
  }

  copy(name?: string, newMoney?: Money): OneTimeTransaction {
    return new OneTimeTransaction(name ?? this.name, newMoney ?? this.money, this.date, this.month, this.year);
  }
}
