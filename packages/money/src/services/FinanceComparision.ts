import { FinanceReport } from "./FinanceReport";
import { Level, SupportLogger } from "../helpers/SupportLogger";
import { Money, Percentage } from "../models/money";
import { ReportDuration } from "../models/datetime/ReportDuration";
import { DateTimeUnit } from "../models/datetime/DateTimeUnit";

export interface FinanceComparisionOption {
  logLevel: Level;
}

export interface CompareResult {
  first: Money;
  second: Money;
  diff: Money;
  percent: Percentage;
}

export class FinanceComparision<K extends string> extends SupportLogger {
  constructor(private reports: Record<K, FinanceReport<K>>, private option: FinanceComparisionOption) {
    super(option.logLevel, "finance-comparision");
  }

  compareDaily(a: K, b: K, duration: ReportDuration = ReportDuration.oneYear()): CompareResult {
    return this.compare(a, b, duration, DateTimeUnit.Day);
  }

  compareMonthly(a: K, b: K, duration: ReportDuration = ReportDuration.oneYear()): CompareResult {
    return this.compare(a, b, duration, DateTimeUnit.Month);
  }

  compareYearly(a: K, b: K, duration: ReportDuration = ReportDuration.oneYear()): CompareResult {
    return this.compare(a, b, duration, DateTimeUnit.Year);
  }

  private compare(a: K, b: K, duration: ReportDuration, unit: DateTimeUnit): CompareResult {
    this.debug(`start compare between ${a} and ${b}`);

    const aReport = this.reports[a];
    const bReport = this.reports[b];

    const aAverage = aReport.average(duration, unit);
    this.debug(`${a} average usage is ${aAverage.toFixString()}`);
    const bAverage = bReport.average(duration, unit);
    this.debug(`${b} average usage is ${bAverage.toFixString()}`);
    const diff = aAverage.minus(bAverage);
    this.debug(`the different is ${diff.toFixString()}`);
    const percent = this.asPercentage(diff, aAverage);
    this.debug(`the percentage is ${percent.toFixString()}`);

    return {
      first: aAverage,
      second: bAverage,
      diff,
      percent,
    };
  }

  private asPercentage(diff: Money, base: Money): Percentage {
    return new Percentage(diff.divide(base.getAmount()).multiply(100).getAmount());
  }
}
