import { PersonBuilder } from "./PersonBuilder";

import { FinanceComparision, FinanceComparisionOption, FinanceReport, Person } from "../services";

export class FinanceComparisionBuilder<T extends string = ""> {
  static new(): FinanceComparisionBuilder {
    return new FinanceComparisionBuilder();
  }

  private reports: Record<string, FinanceReport<string>>;
  private option: FinanceComparisionOption;

  private constructor() {
    this.reports = {};
    this.option = {
      logLevel: "info",
    };
  }

  withErrorMode(): this {
    this.option.logLevel = "error";
    return this;
  }

  withWarnMode(): this {
    this.option.logLevel = "warn";
    return this;
  }

  withDebugMode(): this {
    this.option.logLevel = "debug";
    return this;
  }

  addReport<C extends string>(report: FinanceReport<C>): FinanceComparisionBuilder<T | C> {
    this.reports[report.name] = report;
    return this as FinanceComparisionBuilder<T | C>;
  }

  addPerson<C extends string>(person: Person<C>): FinanceComparisionBuilder<T | C> {
    return this.addReport(new FinanceReport(person));
  }

  addPersonBuilder<C extends string>(builder: PersonBuilder<C>): FinanceComparisionBuilder<T | C> {
    return this.addReport(builder.reporter());
  }

  build(): FinanceComparision<T> {
    return new FinanceComparision<T>(this.reports as Record<T, FinanceReport<T>>, this.option);
  }
}
