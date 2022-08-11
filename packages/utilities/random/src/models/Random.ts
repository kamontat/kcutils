import { ALPHANUMERIC } from "../constants/alphabets";
import type {
  IRandom,
  RandomNumberOption,
  RandomStringOption,
} from "../interfaces/Random";
import type { ISeed, SeedPatch } from "../interfaces/Seed";

export abstract class Random implements IRandom {
  constructor(protected seed: ISeed) {}

  protected getSeed(p?: SeedPatch): number {
    return this.seed.getSeed(p);
  }

  /**
   * Random number base on input options
   * Warning: inclusiveMax will override integer field, meaning if you pass inclusiveMax is true,
   *          it will minus max by 1 (max - 1) even integer is false
   *
   * @param opt number generator options
   * @returns random number
   */
  number(opt: Partial<RandomNumberOption>): number {
    const option: RandomNumberOption = {
      min: opt.min ?? 1,
      max: opt.max ?? 10,
      inclusiveMax: opt.inclusiveMax ?? false,
      integer: opt.integer ?? true,
    };

    const tmpMin = Math.min(option.min, option.max);
    const tmpMax =
      Math.max(option.min, option.max) - (option.inclusiveMax ? 0 : 1);
    const min = Math.min(tmpMin, tmpMax);
    const max = Math.max(tmpMin, tmpMax);
    if (max === min) return min;

    const diff = max - min;
    const r = this.pseudo() * diff + min;

    if (option.integer) return Math.round(r);
    else return r;
  }

  /**
   * Random string base on input options
   * @param opt string generator options
   * @returns random string
   */
  string(opt: Partial<RandomStringOption>): string {
    const option: RandomStringOption = {
      length: opt.length ?? 10,
      possible: opt.possible ?? ALPHANUMERIC,
    };

    let result = "";
    const options = {
      min: 0,
      max: option.possible.length,
      inclusiveMax: false,
      integer: true,
    };

    for (let i = 0; i < option.length; i++) {
      const index = this.number(options);
      result += option.possible[index];
    }

    return result;
  }

  boolean(): boolean {
    const options = { min: 0, max: 1, inclusiveMax: true, integer: true };
    return this.number(options) === 1;
  }

  pick<T>(array: T[]): T {
    const options = {
      min: 0,
      max: array.length,
      inclusiveMax: false,
      integer: true,
    };

    const index = this.number(options);
    return array[index];
  }

  abstract pseudo(): number;
  abstract copy(seed: ISeed): Random;
}
