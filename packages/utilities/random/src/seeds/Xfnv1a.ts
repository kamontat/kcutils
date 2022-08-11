import type { SeedGenerator } from "../interfaces/Seed";
import { Seed } from "../models/Seed";

/**
 * @param input any string input
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions
 */
export const xfnv1a: SeedGenerator = (input) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i++)
    h = Math.imul(h ^ input.charCodeAt(i), 16777619);

  return () => {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    h += h << 5;
    return h >>> 0;
  };
};

/**
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions
 */
export class Xfnv1a extends Seed {
  constructor(input: string) {
    super(input, xfnv1a);
  }
}
