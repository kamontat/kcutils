import { NumberMoney } from "./NumberMoney";
import { MoneyUnits } from "../../constants/MoneyUnits";

export class USDollar extends NumberMoney {
  static zero(): NumberMoney {
    return new USDollar(0);
  }

  constructor(amount: number) {
    super(amount, MoneyUnits.USD);
  }
}
