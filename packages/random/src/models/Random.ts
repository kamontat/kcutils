import {
  englishLowerAlphabetCharacter,
  englishUpperAlphabetCharacter,
  numberCharacter,
} from "../constants/randoms/list";
import { Seed, SeedPatch } from "./Seed";

export interface RandomNumberOption {
  min: number;
  max: number;
  inclusiveMax: boolean;
  integer: boolean;
}

export interface RandomStringOption {
  length: number;
  possible: string[];
}

export abstract class Random {
  constructor(protected seed: Seed) {}

  protected getSeed(p?: SeedPatch): number {
    return this.seed.getSeed(p);
  }

  pick<T>(array: T[]): T {
    const index = this.number({ min: 0, max: array.length, inclusiveMax: false, integer: true });
    return array[index];
  }

  string(opt: Partial<RandomStringOption>): string {
    const option = Object.assign(
      {
        length: 10,
        possible: englishLowerAlphabetCharacter.concat(englishUpperAlphabetCharacter).concat(numberCharacter),
      },
      opt
    );

    let result = "";
    for (let i = 0; i < option.length; i++) {
      result +=
        option.possible[this.number({ min: 0, max: option.possible.length, inclusiveMax: false, integer: true })];
    }
    return result.substr(0, option.length);
  }

  /**
   * Random number base on input options
   * Warning: inclusiveMax will override integer field, meaning if you pass inclusiveMax is true,
   *          it will minus max by 1 (max - 1) ever integer is false
   *
   * @param opt number generator options
   */
  number(opt: Partial<RandomNumberOption>): number {
    const option = Object.assign({ min: 1, max: 10, inclusiveMax: false, integer: true }, opt);

    const tmpMin = Math.min(option.min, option.max);
    const tmpMax = Math.max(option.min, option.max) - (option.inclusiveMax ? 0 : 1);
    const min = Math.min(tmpMin, tmpMax);
    const max = Math.max(tmpMin, tmpMax);
    if (max === min) return min;

    const diff = max - min;
    const r = this.pseudo() * diff + min;

    // console.log(`min: ${min}, max: ${max}, diff: ${diff}, random: ${r}`);
    if (option.integer) return Math.round(r);
    else return r;
  }

  boolean(): boolean {
    return this.number({ min: 0, max: 1, inclusiveMax: true, integer: true }) === 1;
  }

  abstract pseudo(): number;
  abstract copy(seed?: Seed): Random;
}
