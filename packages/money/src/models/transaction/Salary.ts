import { Income } from "./Income";
import { NumberMoney } from "../money/NumberMoney";
import { RecursiveUnit } from "../datetime/RecursiveUnit";

export class Salary extends Income {
  constructor(
    money: NumberMoney,
    day: number | RecursiveUnit.Daily,
    weekdayNumber?: number,
    month?: number | RecursiveUnit.Monthly,
    year?: number | RecursiveUnit.Yearly,
    name: string = "Salary"
  ) {
    super(name, money, weekdayNumber ?? day, weekdayNumber, month, year);
  }
}
