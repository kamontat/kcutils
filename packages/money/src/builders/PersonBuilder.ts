import { Transaction } from "../models/transaction";
import { Person, PersonConfig } from "../services/Person";
import { FinanceReport } from "../services";
import { USDollar, Money } from "../models/money";
import { TransactionBuilder } from "./TransactionBuilder";

export class PersonBuilder<T extends string> {
  private static counter: number = 1;
  static new<N extends string>(name: N): PersonBuilder<N> {
    return new PersonBuilder(name);
  }

  private config: PersonConfig<T>;

  private constructor(name: T) {
    this.config = {
      id: PersonBuilder.counter,
      name,
      logLevel: "info",
      transactions: [],
      money: USDollar.zero(),
    };

    PersonBuilder.counter++;
  }

  withId(id: number): this {
    this.config.id = id;
    return this;
  }

  withBaseMoney(m: Money): this {
    this.config.money = m;
    return this;
  }

  addTransaction(t: Transaction, toggle: boolean = true): this {
    if (toggle) this.config.transactions.push(t);
    return this;
  }

  addTransactionBuilder<T>(t: TransactionBuilder<T>, toggle: boolean = true): this {
    return this.addTransaction(t.build(), toggle);
  }

  ignoreTransaction(t: Transaction): this {
    return this.addTransaction(t, false);
  }

  onErrorMode(): this {
    this.config.logLevel = "error";
    return this;
  }

  onWarnMode(): this {
    this.config.logLevel = "warn";
    return this;
  }

  onDebugMode(): this {
    this.config.logLevel = "debug";
    return this;
  }

  clearTransaction(): this {
    this.config.transactions = [];
    return this;
  }

  build(): Person<T> {
    return new Person(Object.assign({}, this.config));
  }

  reporter(): FinanceReport<T> {
    return new FinanceReport(this.build());
  }
}
