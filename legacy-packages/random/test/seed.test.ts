import { Seed, SeedGenerator } from "../src";

describe("Seed", () => {
  test("Return value base on generator function", () => {
    const gen: SeedGenerator = a => () => parseInt(a);
    const seed = new Seed("1", gen);

    expect(seed.getSeed()).toEqual(1);
    expect(seed.getSeed()).toEqual(1);
  });

  test("Return value with patch when exist", () => {
    const gen: SeedGenerator = a => () => parseInt(a);
    const seed = new Seed("1", gen);

    expect(seed.getSeed(n => n + 1)).toEqual(2);
    expect(seed.getSeed(n => n + 10)).toEqual(11);
  });

  test("Copy new seed", () => {
    const gen: SeedGenerator = a => () => parseInt(a);
    const seed = new Seed("1", gen);

    expect(seed.getSeed()).toEqual(1);

    const newSeed = seed.copy("2");

    expect(seed.getSeed()).toEqual(1);
    expect(newSeed.getSeed()).toEqual(2);
  });

  test("Copy with new generator", () => {
    const gen: SeedGenerator = a => () => parseInt(a);
    const newGen: SeedGenerator = () => () => 5;
    const seed = new Seed("1", gen);

    expect(seed.getSeed()).toEqual(1);
    expect(seed.getSeed()).toEqual(1);

    const newSeed = seed.copy("2", newGen);

    expect(seed.getSeed()).toEqual(1);
    expect(newSeed.getSeed()).toEqual(5);
    expect(newSeed.getSeed()).toEqual(5);
  });
});
