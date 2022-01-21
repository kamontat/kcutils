import { Randoms, Seeds } from "../index";
import { Fixed } from "../src/constants/seeds/fixed";
import { Result } from "./models/RandomResult";

describe("Random constants", () => {
  test.each([
    [1000000, 7],
    [0, 6],
    [-1000000, 2],
  ])("Alea: Random with Seed(%s) will return %s", (i, o) => {
    const r = new Randoms.Alea(new Seeds.Fixed(i));
    expect(r.number({ min: 1, max: 10, inclusiveMax: true })).toBeCloseTo(o, 2);
  });
  test("Alea: copy return new object", () => {
    const r = new Randoms.Alea(new Seeds.Fixed(1));
    const rr = r.copy(new Fixed(2));

    expect(r.pseudo()).toBeCloseTo(0.526047095656395, 8);
    expect(rr.pseudo()).toBeCloseTo(0.4575677579268813, 8);
  });
  test("Alea: The return value of 1000 times should be average with 0.01 error", () => {
    const r = new Randoms.Alea(new Seeds.Xmur3("1000 times"));
    const errors = Result.new(r).average(10000, 75).check(0.01);
    if (errors.length > 0) fail(errors);
  });

  test.each([
    [1000000, 2],
    [0, 1],
    [-1000000, 9],
  ])("Xoshiro128PP: Random with Seed(%s) will return %s", (i, o) => {
    const r = new Randoms.Xoshiro128PP(new Seeds.Fixed(i));
    expect(r.number({ min: 1, max: 10, inclusiveMax: true })).toBeCloseTo(o, 2);
  });
  test("Xoshiro128PP: copy return new object", () => {
    const r = new Randoms.Xoshiro128PP(new Seeds.Fixed(50000000));
    const rr = r.copy(new Fixed(100000000));
    const rrr = r.copy();

    expect(r.pseudo()).toBeCloseTo(0.991873771417886, 8);
    expect(rr.pseudo()).toBeCloseTo(0.9837475430686027, 8);
    expect(rrr.pseudo()).toBeCloseTo(0.991873771417886, 8);
  });
  test("Xoshiro128PP: The return value of 1000 times should be average with 0.01 error", () => {
    const r = new Randoms.Xoshiro128PP(new Seeds.Xfnv1a("1000 times"));
    const errors = Result.new(r).average(10000, 75).check(0.01);
    if (errors.length > 0) fail(errors);
  });

  test.each([
    [1000000, 4],
    [0, 1],
    [-1000000, 7],
  ])("Xoshiro128SS: Random with Seed(%s) will return %s", (i, o) => {
    const r = new Randoms.Xoshiro128SS(new Seeds.Fixed(i));
    expect(r.number({ min: 1, max: 10, inclusiveMax: true })).toBeCloseTo(o, 2);
  });
  test("Xoshiro128SS: copy return new object", () => {
    const r = new Randoms.Xoshiro128SS(new Seeds.Fixed(50000000));
    const rr = r.copy(new Fixed(100000000));
    const rrr = r.copy();

    expect(r.pseudo()).toBeCloseTo(0.055225386982783675, 8);
    expect(rr.pseudo()).toBeCloseTo(0.11045077396556735, 8);
    expect(rrr.pseudo()).toBeCloseTo(0.055225386982783675, 8);
  });
  test("Xoshiro128SS: The return value of 1000 times should be average with 0.01 error", () => {
    const r = new Randoms.Xoshiro128SS(new Seeds.Xfnv1a("1000 times"));
    const errors = Result.new(r).average(10000, 75).check(0.01);
    if (errors.length > 0) fail(errors);
  });
});
