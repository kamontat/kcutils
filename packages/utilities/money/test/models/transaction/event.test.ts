import { Baht, Salary } from "../../../index";

describe("Transaction event", () => {
  test("handle pay event", (cb) => {
    const a = new Salary(new Baht(3000), 10);
    a.listen("pay", (m) => {
      expect(m).toEqual(new Baht(3000));
      cb();
    });

    a.pay();
  });
});
