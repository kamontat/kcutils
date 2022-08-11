import type {
  SeedFn,
  SeedGenerator,
  SeedPatch,
  ISeed,
} from "../interfaces/Seed";

export class Seed implements ISeed {
  private readonly seedFn: SeedFn;

  constructor(input: string, private readonly seedGenerator: SeedGenerator) {
    this.seedFn = seedGenerator(input);
  }

  copy(input: string, newGenerator?: SeedGenerator): Seed {
    return new Seed(input, newGenerator ?? this.seedGenerator);
  }

  getSeed(patch?: SeedPatch): number {
    const result = this.seedFn();
    if (patch) return patch(result);
    else return result;
  }
}
