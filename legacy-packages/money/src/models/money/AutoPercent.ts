import { Percentage } from "./Percentage";

export type AutoPercentAction = "increase" | "decrease";
export class AutoPercent extends Percentage {
  constructor(num: number, private action: AutoPercentAction, private rawName: string) {
    super(num);
  }

  get name(): string {
    const sign = this.action === "increase" ? "+" : "-";
    return `${sign} ${this.rawName}`;
  }

  protected modifyResult(p: number): number {
    if (this.action === "decrease") return p === 0 ? 0 : p * -1;
    else return p === 0 ? 0 : p;
  }

  toString(): string {
    return `${this.name} ${this.percent}%`;
  }

  toFixString(digit: number = 3): string {
    return `${this.name} ${parseFloat(this.percent.toFixed(digit))}%`;
  }
}

export class PercentIncrease extends AutoPercent {
  constructor(num: number, name?: string) {
    super(num, "increase", name ?? "PercentIncrease");
  }
}

export class PercentDecrease extends AutoPercent {
  constructor(num: number, name?: string) {
    super(num, "decrease", name ?? "PercentDecrease");
  }
}

export class Uplift extends AutoPercent {
  constructor(num: number, name?: string) {
    super(num, "increase", name ?? "Uplift");
  }

  calculate(): number {
    return this.modifyResult(this.percent);
  }
}

export class Downlift extends AutoPercent {
  constructor(num: number, name?: string) {
    super(num, "decrease", name ?? "Downlift");
  }

  calculate(): number {
    return this.modifyResult(this.percent);
  }
}
