export type SeedFn = () => number;
export type SeedGenerator = (input: string) => SeedFn;
export type SeedPatch = (n: number) => number;

/**
 * Seed is a initialize a pseudorandom number generator (PRNGs)
 * This is can dynamically generate seed function and patch the outcome
 *
 * @see {@link Random}
 */
export class Seed {
  private readonly seedFn: SeedFn;

  /**
   * create Seed object for pseudorandom number generator (PRNGs)
   *
   * @param input input secret key for initialize a seed algorithm
   * @param seedGenerator seed generator function which will convert input secret to seed number
   */
  constructor(input: string, private readonly seedGenerator: SeedGenerator) {
    this.seedFn = seedGenerator(input);
  }

  /**
   * copy current seed algorithm with different secret key, or different generator
   *
   * @param input input secret key
   * @param newGenerator overrided generator (default is a current generator)
   * @returns new seed object
   */
  copy(input: string, newGenerator?: SeedGenerator): Seed {
    return new Seed(input, newGenerator ?? this.seedGenerator);
  }

  /**
   * dynamically get seed number base on generator.
   * meaning this function can return different value per call based on your generator algorithm.
   *
   * @param patch override seed number if needed
   * @returns seed number
   */
  getSeed(patch?: SeedPatch): number {
    const result = this.seedFn();
    if (patch) return patch(result);
    else return result;
  }
}
