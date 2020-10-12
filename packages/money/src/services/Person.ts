import { Level, SupportLogger } from "../helpers/SupportLogger";
import { Datetime } from "../models/datetime";
import { Money, NumberMoney } from "../models/money";
import { Transaction } from "../models/transaction";

export interface PersonConfig<T extends string> {
  id: number;
  name: T;
  logLevel: Level;
  transactions: Transaction[];
  money: NumberMoney;
}

export type TransactionLoopingFn = (
  money: Money,
  transactions: Transaction[],
  current: Datetime,
  start: Datetime
) => Money;

export class Person<T extends string> extends SupportLogger {
  constructor(private config: PersonConfig<T>) {
    super(config.logLevel, "person");

    this.debug(`creating person ${config.id} with ${config.money.toFixString()}`);
  }

  get id(): number {
    return this.config.id;
  }

  get name(): T {
    return this.config.name;
  }

  get money(): NumberMoney {
    return this.config.money.copy();
  }

  get logLevel(): Level {
    return this.config.logLevel;
  }

  loop(start: Datetime, stop: Datetime, fn: TransactionLoopingFn): Money {
    const transactions = Array.from(this.config.transactions);
    const current = start.copy();
    let amoney: Money = this.money;

    this.debug(`starting ${start.toString()} -> ${stop.toString()}`);

    while (!current.after(stop)) {
      this.debug(`start date: ${current.toString()}`);
      const eligibleTransactions = transactions.filter(t => t.isEligible(start, current) && !t.isPaid());
      this.debug(`transactions: ${eligibleTransactions.toString()}`);
      if (eligibleTransactions.length > 0) {
        this.debug(`before money: ${amoney.toString()}`);
        amoney = fn(amoney, eligibleTransactions, current, start);
        this.debug(`after money:  ${amoney.toString()}`);
      }

      current.nextDay();
    }

    return amoney;
  }

  toString(): string {
    return `${this.config.name}(${this.config.id}): have ${this.config.transactions.length} transactions`;
  }
}
