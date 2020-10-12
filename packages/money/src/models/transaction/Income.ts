import { RecursiveTransaction } from "./RecursiveTransaction";
import { TransactionType } from "./TransactionType";
import { NumberMoney } from "../money/NumberMoney";
import { RecursiveUnit } from "../datetime/RecursiveUnit";

export class Income extends RecursiveTransaction {
  constructor(
    name: string,
    money: NumberMoney,
    day: number | RecursiveUnit.Daily,
    weekdayNumber?: number,
    month?: number | RecursiveUnit.Monthly,
    year?: number | RecursiveUnit.Yearly
  ) {
    super(name, money, weekdayNumber ?? day, weekdayNumber ?? 0 > 0 ? RecursiveUnit.Weekly : undefined, month, year);
  }

  getType(): TransactionType {
    return TransactionType.Income;
  }

  isPaid(): boolean {
    return false;
  }

  copy(name?: string, newMoney?: NumberMoney): Income {
    return new Income(
      name ?? this.name,
      newMoney ?? (this.money as NumberMoney),
      this.date,
      this.weekdayNumber,
      this.month,
      this.year
    );
  }
}
