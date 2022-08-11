import { Fixed, RandomNumberOption, RandomStringOption } from "../index";
import { MockRandom } from "./models/MockRandom";

describe("Random", () => {
  test("Fix seed will return fix result", () => {
    const rand = new MockRandom(new Fixed(1));
    expect(rand.pseudo()).toEqual(1);
    expect(rand.pseudo()).toEqual(1);
  });

  test.each([
    [0.99, true],
    [1, true],
    [0, false],
    [-1, false],
  ])("When random return %s, boolean result should be %s", (n, b) => {
    const r = new MockRandom(new Fixed(n));
    expect(r.boolean()).toEqual(b);
  });

  test("copy will return new object", () => {
    const t = new MockRandom(new Fixed(1));
    expect(t.pseudo()).toEqual(1);

    const tt = t.copy(new Fixed(2));
    expect(tt.pseudo()).toEqual(2);

    expect(t.pseudo()).toEqual(1);
  });

  test.each([
    [
      0.55,
      {
        min: 0,
        max: 10,
        inclusiveMax: false,
        integer: false,
      } as RandomNumberOption,
      4.95,
    ],
    [
      0.55,
      {
        min: 0,
        max: 10,
        inclusiveMax: false,
        integer: true,
      } as RandomNumberOption,
      5,
    ],
    [
      0.55,
      {
        min: 0,
        max: 10,
        inclusiveMax: true,
        integer: false,
      } as RandomNumberOption,
      5.5,
    ],
    [
      0.55,
      {
        min: 0,
        max: 10,
        inclusiveMax: true,
        integer: true,
      } as RandomNumberOption,
      6,
    ],
    [
      0.55,
      {
        min: 0,
        max: 0,
        inclusiveMax: true,
        integer: true,
      } as RandomNumberOption,
      0,
    ],
    [
      0.55,
      {
        min: 0,
        max: 0,
        inclusiveMax: false,
        integer: true,
      } as RandomNumberOption,
      0,
    ],
    [
      0.03,
      {
        min: 0,
        max: 1,
        inclusiveMax: true,
        integer: true,
      } as RandomNumberOption,
      0,
    ],
    [
      0.97,
      {
        min: 0,
        max: 1,
        inclusiveMax: true,
        integer: true,
      } as RandomNumberOption,
      1,
    ],
    [
      0.03,
      {
        min: 0,
        max: 1,
        inclusiveMax: false,
        integer: true,
      } as RandomNumberOption,
      0,
    ],
    [
      0.97,
      {
        min: 0,
        max: 1,
        inclusiveMax: false,
        integer: true,
      } as RandomNumberOption,
      0,
    ],
    [
      0.55,
      {
        min: 0,
        max: 1,
        inclusiveMax: false,
        integer: true,
      } as RandomNumberOption,
      0,
    ],
    [
      0.03,
      {
        min: 0,
        max: 1,
        inclusiveMax: true,
        integer: false,
      } as RandomNumberOption,
      0.03,
    ],
    [
      0.97,
      {
        min: 0,
        max: 1,
        inclusiveMax: true,
        integer: false,
      } as RandomNumberOption,
      0.97,
    ],
    [
      0.03,
      {
        min: 0,
        max: 1,
        inclusiveMax: false,
        integer: false,
      } as RandomNumberOption,
      0,
    ],
    [
      0.97,
      {
        min: 0,
        max: 1,
        inclusiveMax: false,
        integer: false,
      } as RandomNumberOption,
      0,
    ],
  ])("When random return %s, number option %p should be %s", (i, o, n) => {
    const t = new MockRandom(new Fixed(i));
    expect(t.number(o)).toBeCloseTo(n, 2);
  });

  test.each([
    [0.33, {} as RandomStringOption, "uuuuuuuuuu"],
    [0.123, {} as RandomStringOption, "iiiiiiiiii"],

    [0.3, { length: 1 } as RandomStringOption, "s"],
    [0.32, { length: 1 } as RandomStringOption, "u"],
    [0.34, { length: 1 } as RandomStringOption, "v"],
    [0.5, { length: 1 } as RandomStringOption, "F"],
    [0.53, { length: 1 } as RandomStringOption, "G"],
    [0.55, { length: 1 } as RandomStringOption, "I"],
  ])(`When random return %s, string option %p should be %s`, (i, o, s) => {
    const t = new MockRandom(new Fixed(i));
    expect(t.string(o)).toEqual(s);
  });

  test.each([
    [0.55, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 6],
    [0.03, [1, 2], 1],
    [0.9999, [9], 9],
  ])(
    "When random return %s, pick up element from %p should be %s",
    (i, arr, o) => {
      const t = new MockRandom(new Fixed(i));
      expect(t.pick(arr)).toEqual(o);
    }
  );
});
