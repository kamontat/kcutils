import { generic } from "@kcutils/helper";
import { EventEmitter } from "events";
import { Datetime } from "../datetime/Datetime";
import { AutoPercent } from "../money";
import { Money } from "../money/Money";

import { TransactionType } from "./TransactionType";

export interface TransactionEvent {
  pay: (m: Money) => void;
}

export abstract class Transaction {
  private event: EventEmitter;

  constructor(protected readonly name: string, protected readonly money: Money) {
    if (this.getType() === TransactionType.Expense) this.money = this.money.negative();
    this.event = new EventEmitter();
  }

  abstract getType(): TransactionType;
  abstract isPaid(): boolean;

  plus(t: Transaction): Transaction {
    const newMoney = this.plusMoney(t.money);
    return this.copy(`${this.name} + ${t.name}`, newMoney);
  }

  minus(t: Transaction): Transaction {
    const newMoney = this.minusMoney(t.money);

    return this.copy(`${this.name} - ${t.name}`, newMoney);
  }

  apply(auto: AutoPercent): Transaction {
    const newMoney = this.money.apply(auto);
    return this.copy(`${this.name} ${auto.name}`, newMoney);
  }

  pay(): Money {
    const money = this.money.copy();
    this.event.emit("pay", money);
    return money;
  }

  listen<K extends keyof TransactionEvent, V extends TransactionEvent[K] = TransactionEvent[K]>(key: K, fn: V): void {
    this.event.on(key, fn);
  }

  protected plusMoney(money: Money): Money {
    return this.money.plus(money);
  }

  protected minusMoney(money: Money): Money {
    return this.money.minus(money);
  }

  abstract isEligible(_start: Datetime, _current: Datetime): boolean;
  abstract copy(name?: string, newMoney?: Money): Transaction;

  toString(): string {
    if (generic.nonEmpty(this.name)) return `${this.name}: ${this.money.toString()}`;
    else return this.money.toString();
  }

  toFixString(digit: number = 2): string {
    if (generic.nonEmpty(this.name)) return `${this.name}: ${this.money.toFixString(digit)}`;
    else return this.money.toFixString(digit);
  }
}
