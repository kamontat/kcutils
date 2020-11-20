import { RecursiveTransaction } from "./RecursiveTransaction";
import { TransactionType } from "./TransactionType";
import { Money } from "../money/Money";
import { RecursiveUnit } from "../datetime/RecursiveUnit";

export class Income extends RecursiveTransaction {
  constructor(
    name: string,
    money: Money,
    day: number | RecursiveUnit.Daily,
    weekdayNumber?: number,
    month?: number | RecursiveUnit.Monthly,
    year?: number | RecursiveUnit.Yearly
  ) {
    const n = weekdayNumber ?? 0;
    super(name, money, weekdayNumber ?? day, n > 0 ? RecursiveUnit.Weekly : undefined, month, year);
  }

  getType(): TransactionType {
    return TransactionType.Income;
  }

  isPaid(): boolean {
    return false;
  }

  copy(name?: string, newMoney?: Money): Income {
    return new Income(name ?? this.name, newMoney ?? this.money, this.date, this.weekdayNumber, this.month, this.year);
  }
}
