import { PercentMoney } from "./PercentMoney";

export class Split extends PercentMoney {
  constructor(personNumber: number = 1) {
    const a = 100 / personNumber;
    super(100 - a);
  }
}
