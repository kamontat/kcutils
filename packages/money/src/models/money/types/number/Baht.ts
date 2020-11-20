import { MoneyUnits } from "../../../../constants";
import { Money } from "../../Money";

export class Baht extends Money {
  static zero(): Money {
    return new Baht(0);
  }

  constructor(amount: number) {
    super(amount, MoneyUnits.THB);
  }
}
