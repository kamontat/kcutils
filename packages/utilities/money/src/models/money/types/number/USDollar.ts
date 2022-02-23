import { MoneyUnits } from "../../../../constants";
import { Money } from "../../Money";

export class USDollar extends Money {
  static zero(): Money {
    return new USDollar(0);
  }

  constructor(amount: number) {
    super(amount, MoneyUnits.USD);
  }
}
