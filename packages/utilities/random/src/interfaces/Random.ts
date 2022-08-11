import type { ISeed } from "./Seed";

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

export interface IRandom {
  pseudo(): number;
  copy(seed: ISeed): IRandom;
}
