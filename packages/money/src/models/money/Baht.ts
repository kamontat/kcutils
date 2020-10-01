import { NumberMoney } from "./NumberMoney";
import { MoneyUnits } from "../../constants/MoneyUnits";

export class Baht extends NumberMoney {
  static zero(): NumberMoney {
    return new Baht(0);
  }

  constructor(amount: number) {
    super(amount, MoneyUnits.THB);
  }
}
