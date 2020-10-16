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

  number(opt: Partial<RandomNumberOption>): number {
    const option = Object.assign({ min: 1, max: 10, inclusiveMax: false, integer: true }, opt);

    const min = Math.min(option.min, option.max);
    const max = Math.max(option.min, option.max);
    const diff = max - min + (option.inclusiveMax && !option.integer ? 1 : 0);

    const r = this.pseudo() * diff + min;
    if (option.integer) return Math.round(r);
    else return r;
  }

  boolean(): boolean {
    return this.number({ min: 0, max: 1, inclusiveMax: true, integer: true }) === 1;
  }

  abstract pseudo(): number;
  abstract copy(seed?: Seed): Random;
}
