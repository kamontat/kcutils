import { Random, RandomNumberOption, RandomStringOption, Seed } from "../src";
import { Fixed } from "../src/constants/seeds/fixed";

class T extends Random {
  pseudo(): number {
    return this.getSeed();
  }
  copy(s?: Seed) {
    return new T(s ?? this.seed);
  }
}

describe("Random", () => {
  test("Fix seed will return fix result", () => {
    const r = new T(new Fixed(1));

    expect(r.pseudo()).toEqual(1);
    expect(r.pseudo()).toEqual(1);
  });

  test.each([
    [0.99, true],
    [1, true],
    [0, false],
    [-1, false],
  ])("When random return %s, boolean result should be %s", (n, b) => {
    const r = new T(new Fixed(n));
    expect(r.boolean()).toEqual(b);
  });

  test("copy will return new object", () => {
    const t = new T(new Fixed(1));
    expect(t.pseudo()).toEqual(1);

    const tt = t.copy(new Fixed(2));
    expect(tt.pseudo()).toEqual(2);

    expect(t.pseudo()).toEqual(1);
  });

  test.each([
    [0.55, { min: 0, max: 10, inclusiveMax: false, integer: false } as RandomNumberOption, 5.5],
    [0.55, { min: 0, max: 10, inclusiveMax: false, integer: true } as RandomNumberOption, 6],
    [0.55, { min: 0, max: 10, inclusiveMax: true, integer: false } as RandomNumberOption, 6.05],
    [0.55, { min: 0, max: 10, inclusiveMax: true, integer: true } as RandomNumberOption, 6],
  ])("When random return %s, number option %p should be %s", (i, o, n) => {
    const t = new T(new Fixed(i));
    expect(t.number(o)).toBeCloseTo(n, 2);
  });

  test.each([
    [0.33, {} as RandomStringOption, "uuuuuuuuuu"],
    [0.123, {} as RandomStringOption, "iiiiiiiiii"],

    [0.3, { length: 1 } as RandomStringOption, "t"],
    [0.32, { length: 1 } as RandomStringOption, "u"],
    [0.34, { length: 1 } as RandomStringOption, "v"],
    [0.5, { length: 1 } as RandomStringOption, "F"],
    [0.53, { length: 1 } as RandomStringOption, "H"],
    [0.55, { length: 1 } as RandomStringOption, "I"],
  ])(`When random return %s, string option %p should be %s`, (i, o, s) => {
    const t = new T(new Fixed(i));
    expect(t.string(o)).toEqual(s);
  });
});
