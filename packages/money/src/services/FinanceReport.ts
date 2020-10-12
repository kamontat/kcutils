import { SupportLogger } from "../helpers/SupportLogger";
import { DateTimeUnit } from "../models/datetime";
import { ReportDuration } from "../models/datetime/ReportDuration";
import { Money, NumberMoney } from "../models/money";
import { Person } from "./Person";

export class FinanceReport<T extends string> extends SupportLogger {
  constructor(private readonly person: Person<T>) {
    super(person.logLevel, "finance-report");
  }

  get id(): number {
    return this.person.id;
  }

  get name(): T {
    return this.person.name;
  }

  summary(duration: ReportDuration): Money {
    return this.person.loop(duration.start, duration.stop, (m, transactions) => {
      transactions.forEach(t => {
        const paid = t.pay();
        this.debug(`  - paying ${t.toString()}`);
        m = m.plus(paid);
      });

      return m;
    });
  }

  average(duration: ReportDuration, unit: DateTimeUnit): NumberMoney {
    const startMoney = this.person.money;
    const stopMoney = this.summary(duration);

    this.debug(`start money: ${startMoney.toFixString()} | stop money: ${stopMoney.toFixString()}`);
    const money = stopMoney.minus(startMoney).divide(duration.duration.as(unit));
    return NumberMoney.toNumberMoney(money);
  }
}
