import { PercentMoney } from "./PercentMoney";

export class SocialSecurity extends PercentMoney {
  getAmount(base?: number): number {
    if (base === undefined) return this.percent;
    else {
      const tax = Math.round(base * this.percent) / 100;
      if (tax > 750) return 750;
      else return tax;
    }
  }
}
