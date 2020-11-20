import { Type, TypeChecker } from "./Type";

export type PercentageType = "percentage";
export class Percentage implements Type<PercentageType> {
  static is(t: Type<string>): t is Percentage {
    return TypeChecker.on(t, "percentage");
  }

  /**
   * Create new percentage number or money calculation
   *
   * @param num number as integer percent format (mean normal range is 0 - 100)
   */
  constructor(readonly percent: number) {}

  calculate(base: number): number {
    return this.modifyResult((this.percent / 100) * base);
  }

  protected modifyResult(p: number): number {
    return p;
  }

  get type(): PercentageType {
    return "percentage";
  }

  toString(): string {
    return `${this.percent}%`;
  }

  toFixString(digit: number = 3): string {
    return `${parseFloat(this.percent.toFixed(digit))}%`;
  }
}
