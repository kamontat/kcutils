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

const englishLowerAlphabetCharacter = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const englishUpperAlphabetCharacter = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const numberCharacter = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export class Random {
  private readonly defaultSeed: number;
  private seed: number;

  constructor(seed: number = 0) {
    this.defaultSeed = +new Date() + Math.abs(seed) + 0x6d2b79f5;
    this.seed = this.defaultSeed;
  }

  number(opt?: Partial<RandomNumberOption>): number {
    const option = Object.assign({ min: 1, max: 10, inclusiveMax: false, integer: true }, opt);

    const min = Math.min(option.min, option.max);
    const max = Math.max(option.min, option.max);
    const diff = max - min + (option.inclusiveMax ? 1 : 0);

    const r = this.random() * diff + min;
    if (option.integer) return Math.round(r);
    else return r;
  }

  string(opt?: Partial<RandomStringOption>): string {
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

  boolean(): boolean {
    return this.number({ min: 0, max: 1, inclusiveMax: true, integer: true }) === 1;
  }

  clear(): this {
    this.seed = this.defaultSeed;
    return this;
  }

  get numberList(): string[] {
    return numberCharacter;
  }

  get lowerEnglishAlphabet(): string[] {
    return englishLowerAlphabetCharacter;
  }

  get upperEnglishAlphabet(): string[] {
    return englishUpperAlphabetCharacter;
  }

  private random(): number {
    let t = this.seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    this.seed = t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

export const rand = new Random();
