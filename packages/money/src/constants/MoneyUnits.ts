import { MoneyUnit } from "../models/money";

export class MoneyUnits {
  /**
   * Base currency (USD)
   */
  static USD: MoneyUnit = new MoneyUnit("USD", 1); // eslint-disable-line @typescript-eslint/naming-convention

  /**
   * Thailand currency (THB)
   */
  static THB: MoneyUnit = new MoneyUnit("THB", 32); // eslint-disable-line @typescript-eslint/naming-convention

  /**
   * This function is for create custom money currency (unit) that not support yet.
   *
   * @param name Currency code (https://en.wikipedia.org/wiki/ISO_4217)
   * @param multiple exchange rate compare to 1 USD
   *
   * @see {Money}
   */
  static custom(name: string, multiple: number): MoneyUnit {
    return new MoneyUnit(name, multiple);
  }
}
