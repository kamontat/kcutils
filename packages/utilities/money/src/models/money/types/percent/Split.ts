import { PercentDecrease } from "../../AutoPercent";

export class Split extends PercentDecrease {
  constructor(personNumber: number = 1) {
    const a = personNumber < 2 ? 100 : 100 / personNumber;
    super(100 - a); // remove from
  }
}
