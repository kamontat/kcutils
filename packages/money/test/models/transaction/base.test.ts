import { Baht, Money, Transaction, TransactionType, Uplift, Downlift, USDollar } from "../../../src";

class Ex extends Transaction {
  isEligible() {
    return true;
  }

  getType() {
    return TransactionType.Expense;
  }

  isPaid() {
    return false;
  }

  copy(name?: string, newMoney?: Money): In {
    return new Ex(name ?? this.name, newMoney ?? this.money);
  }
}

class In extends Transaction {
  isEligible() {
    return true;
  }

  getType() {
    return TransactionType.Income;
  }

  isPaid() {
    return false;
  }

  copy(name?: string, newMoney?: Money): In {
    return new In(name ?? this.name, newMoney ?? this.money);
  }
}

describe("Transaction", () => {
  const inc = new In("global IN", new Baht(5000));
  const exp = new Ex("global EX", new Baht(400));

  const uplift = new Uplift(10, "10 baht");
  const downlift = new Downlift(10, "10 baht");

  test.each([
    ["", new Baht(5), "-5 THB"],
    ["test", new Baht(15.55), "test: -15.55 THB"],
  ])("Money(%s, %s).toString() return '%s'", (name, m, result) => {
    expect(new Ex(name, m).toString()).toEqual(result);
  });

  test.each([
    ["", new Baht(5), "5 THB"],
    ["test", new Baht(15.55), "test: 15.55 THB"],
  ])("Money(%s, %s).toString() return '%s'", (name, m, result) => {
    expect(new In(name, m).toString()).toEqual(result);
  });

  test.each([
    ["", new USDollar(19.9989), "-20 USD"],
    ["test", new USDollar(19.9899), "test: -19.99 USD"],
  ])("Money(%s, %s).toFixString() return '%s'", (name, m, result) => {
    expect(new Ex(name, m).toFixString()).toEqual(result);
  });

  test.each([
    ["", new USDollar(19.9989), "20 USD"],
    ["test", new USDollar(19.9899), "test: 19.99 USD"],
  ])("Money(%s, %s).toFixString() return '%s'", (name, m, result) => {
    expect(new In(name, m).toFixString()).toEqual(result);
  });

  test.each([
    ["", new USDollar(19), 5, "-19 USD"],
    ["test", new USDollar(20.987), 4, "test: -20.987 USD"],
    ["", new USDollar(19.2222), 2, "-19.22 USD"],
    ["test", new USDollar(0.0001), 3, "test: 0 USD"],
  ])("Money(%s, %s).toFixString(%s) return '%s'", (name, m, digit, result) => {
    expect(new Ex(name, m).toFixString(digit)).toEqual(result);
  });

  test.each([
    ["", new USDollar(19), 5, "19 USD"],
    ["test", new USDollar(20.987), 4, "test: 20.987 USD"],
    ["", new USDollar(19.2222), 2, "19.22 USD"],
    ["test", new USDollar(0.0001), 3, "test: 0 USD"],
  ])("Money(%s, %s).toFixString(%s) return '%s'", (name, m, digit, result) => {
    expect(new In(name, m).toFixString(digit)).toEqual(result);
  });

  describe("Expense", () => {
    test("create new object", () => {
      expect(new Ex("test", new Baht(10))).not.toBeUndefined();
    });

    test(".minus(In)", () => {
      expect(exp.minus(inc)).toEqual(new Ex("global EX - global IN", new Baht(-5400)));
    });

    test(".minus(Ex)", () => {
      expect(exp.minus(exp)).toEqual(new Ex("global EX - global EX", new Baht(0)));
    });

    test(".plus(In)", () => {
      expect(exp.plus(inc)).toEqual(new Ex("global EX + global IN", new Baht(-4600)));
    });

    test(".plus(Ex)", () => {
      expect(exp.plus(exp)).toEqual(new Ex("global EX + global EX", new Baht(-800)));
    });

    test(".apply(uplift)", () => {
      expect(exp.apply(uplift)).toEqual(new Ex("global EX + 10 baht", new Baht(-390)));
    });

    test(".apply(downlift)", () => {
      expect(exp.apply(downlift)).toEqual(new Ex("global EX - 10 baht", new Baht(-410)));
    });
  });

  describe("Income", () => {
    test("create new object", () => {
      expect(new In("test", new Baht(10))).not.toBeUndefined();
    });

    test(".minus(In)", () => {
      expect(inc.minus(inc)).toEqual(new In("global IN - global IN", new Baht(0)));
    });

    test(".minus(Ex)", () => {
      expect(inc.minus(exp)).toEqual(new In("global IN - global EX", new Baht(5400)));
    });

    test(".plus(In)", () => {
      expect(inc.plus(inc)).toEqual(new In("global IN + global IN", new Baht(10000)));
    });

    test(".plus(Ex)", () => {
      expect(inc.plus(exp)).toEqual(new In("global IN + global EX", new Baht(4600)));
    });

    test(".apply(uplift)", () => {
      expect(inc.apply(uplift)).toEqual(new In("global IN + 10 baht", new Baht(5010)));
    });

    test(".apply(downlift)", () => {
      expect(inc.apply(downlift)).toEqual(new In("global IN - 10 baht", new Baht(4990)));
    });
  });
});
