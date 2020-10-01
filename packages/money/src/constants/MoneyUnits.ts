import { MoneyUnit } from "../models/money/MoneyUnit";

export class MoneyUnits {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static USD: MoneyUnit = new MoneyUnit("USD", 1);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static THB: MoneyUnit = new MoneyUnit("THB", 32);

  static custom(name: string, multiple: number): MoneyUnit {
    return new MoneyUnit(name, multiple);
  }
}
