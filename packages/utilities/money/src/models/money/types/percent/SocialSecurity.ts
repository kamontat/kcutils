import { PercentDecrease } from "../../AutoPercent";

export class SocialSecurity extends PercentDecrease {
  protected modifyResult(p: number): number {
    const pp = super.modifyResult(p);
    if (pp < -750) return -750;
    else return pp;
  }
}
