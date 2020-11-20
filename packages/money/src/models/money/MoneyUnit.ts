export class MoneyUnit {
  constructor(readonly name: string, readonly multiple: number) {}

  toString(): string {
    return `${this.name} (1 USD = ${this.multiple} ${this.name})`;
  }
}
