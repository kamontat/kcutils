import {
  englishLowerAlphabetCharacter,
  englishUpperAlphabetCharacter,
  numberCharacter,
} from "../constants/randoms/list";
import { Seed, SeedPatch } from "./Seed";

/**
 * Option when random number
 */
export interface RandomNumberOption {
  /** minimum number that can return */
  min: number;
  /** maximum number that can return */
  max: number;
  /** true for return inclusive maximum; otherwise, for return maximum - 1 */
  inclusiveMax: boolean;
  /** if true, will always return integer; otherwise, return int or float */
  integer: boolean;
}

/**
 * Option when random string
 */
export interface RandomStringOption {
  /** output string length */
  length: number;
  /** all possible character of output string */
  possible: string[];
}

/**
 * generate random value object.
 *
 * you must override {@link Random.pseudo()} function
 * in order to generate random pseudo number.
 *
 * You will have {@link Random.getSeed()} for get generated seed number
 */
export abstract class Random {
  constructor(protected seed: Seed) {}

  protected getSeed(p?: SeedPatch): number {
    return this.seed.getSeed(p);
  }

  /**
   * pick one value from input choices
   *
   * @param array picking choices
   * @returns one value from choices
   */
  pick<T>(array: T[]): T {
    const index = this.number({
      min: 0,
      max: array.length,
      inclusiveMax: false,
      integer: true,
    });
    return array[index];
  }

  /**
   * Random string base on input options
   *
   * @param opt string generator options
   * @returns randomly string with configure input option
   */
  string(opt: Partial<RandomStringOption>): string {
    const option = Object.assign(
      {
        length: 10,
        possible: englishLowerAlphabetCharacter
          .concat(englishUpperAlphabetCharacter)
          .concat(numberCharacter),
      },
      opt
    );

    let result = "";
    for (let i = 0; i < option.length; i++) {
      result +=
        option.possible[
          this.number({
            min: 0,
            max: option.possible.length,
            inclusiveMax: false,
            integer: true,
          })
        ];
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
    const option = Object.assign(
      { min: 1, max: 10, inclusiveMax: false, integer: true },
      opt
    );

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
   * Random boolean value
   *
   * @returns either true or false randomly
   */
  boolean(): boolean {
    return (
      this.number({ min: 0, max: 1, inclusiveMax: true, integer: true }) === 1
    );
  }

  /**
   * Generate random pseudo number
   *
   * @returns random number between [0 - 1]
   */
  abstract pseudo(): number;

  /**
   * Copy new random object with optional new seed
   *
   * @param seed new seed
   * @returns new random object
   */
  abstract copy(seed?: Seed): Random;
}
