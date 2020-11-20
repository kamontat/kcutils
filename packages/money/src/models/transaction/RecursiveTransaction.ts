import { Datetime } from "../datetime/Datetime";
import { Transaction } from "./Transaction";
import { Money } from "../money/Money";
import { TransactionType } from "./TransactionType";
import { RecursiveUnit } from "../datetime/RecursiveUnit";

export abstract class RecursiveTransaction extends Transaction {
  protected readonly weekdayNumber: number;

  constructor(
    name: string,
    money: Money,
    protected readonly date: number | RecursiveUnit.Daily,
    protected readonly weekday?: RecursiveUnit.Weekly,
    protected readonly month: number | RecursiveUnit.Monthly = RecursiveUnit.Monthly,
    protected readonly year: number | RecursiveUnit.Yearly = RecursiveUnit.Yearly
  ) {
    super(name, money);

    if (weekday === RecursiveUnit.Weekly && date !== RecursiveUnit.Daily) this.weekdayNumber = date;
    else this.weekdayNumber = -1;
  }

  abstract getType(): TransactionType;
  abstract isPaid(): boolean;

  isEligible(_start: Datetime, current: Datetime): boolean {
    if (this.weekday === RecursiveUnit.Weekly)
      // default is monday
      return current.currentWeekday() === (this.date === RecursiveUnit.Daily ? 1 : this.date);
    else
      return (
        this.checkDate(current.currentDate()) &&
        this.checkMonth(current.currentMonth()) &&
        this.checkYear(current.currentYear())
      );
  }

  private checkDate(date: number) {
    if (this.date === RecursiveUnit.Daily) return true;
    else return date === this.date;
  }

  private checkMonth(month: number) {
    if (this.month === RecursiveUnit.Monthly) return true;
    else return month === this.month;
  }

  private checkYear(year: number) {
    if (this.year === RecursiveUnit.Yearly) return true;
    else return year === this.year;
  }

  abstract copy(name?: string, newMoney?: Money): Transaction;
}
