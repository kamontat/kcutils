import { Seed, SeedGenerator } from "../../models/Seed";

/**
 * This is seed generator for Seed class.
 *
 * @param input any string input
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions
 */
export const xmur3: SeedGenerator = input => {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++)
    (h = Math.imul(h ^ input.charCodeAt(i), 3432918353)), (h = (h << 13) | (h >>> 19));

  return () => {
    (h = Math.imul(h ^ (h >>> 16), 2246822507)), (h = Math.imul(h ^ (h >>> 13), 3266489909));
    return (h ^= h >>> 16) >>> 0;
  };
};

export class Xmur3 extends Seed {
  constructor(input: string) {
    super(input, xmur3);
  }
}
