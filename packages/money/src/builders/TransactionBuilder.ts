import { Baht, Money } from "../models/money";
import { Transaction } from "../models/transaction";

export type TransactionBuilderFunction<O> = (name: string, money: Money, option?: O) => Transaction;
export class TransactionBuilder<O> {
  static new<O>(fn: TransactionBuilderFunction<O>): TransactionBuilder<O> {
    return new TransactionBuilder(fn);
  }

  private name: string;
  private money: Money;
  private option?: O;

  private constructor(private fn: TransactionBuilderFunction<O>) {
    this.name = "unknown";
    this.money = Baht.zero();
    this.option = undefined;
  }

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withAmount(money: Money): this {
    this.money = money;
    return this;
  }

  withOption(o: O): this {
    this.option = o;
    return this;
  }

  build(): Transaction {
    return this.fn(this.name, this.money, this.option);
  }
}
